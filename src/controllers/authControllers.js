/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const {Users} = db;
const {v4: uuidv4} = require('uuid');
const {successResponse, errorResponse} = require('../helpers');
const {createLogs} = require('../controllers/activitylogControllers');

const register = async (req, res, next) =>{
  try {
    // const data = await authServices.register(req, res, next);
    const emailExist = await Users.findOne({
      where: {email: req.body.email},
    });
    if (emailExist) {
      return errorResponse(req, res, `user with email ${req.body.email} already exists`, 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
    // retrive client's data and store it into val variable using spread operator
    const val = {...req.body, id: uuidv4(), password: hashedPassword};
    const newUser = await Users.create(val);
    
    await createLogs( newUser.id, 4, 'New user registeration', `New user is registered with ${newUser.id} User id`, null, '1A', req, res, next );
    await successResponse(req, res, newUser);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating a new user.', 500, {err: error});
  }
};


/* 
 ○ Login function creates Access Toeken and Refresh Token which stores in Header and cookie respectively,
 and without Access Token we can not access any API
  */
const login = async (req, res, next) => {
  try {
 
    const user = await Users.findOne({where: {email: req.body.email}});
    if (!user) {
      return errorResponse(req, res, 'Invalid credentials.', 404); 
      // please register first
    }
    // Checking if password mathches :
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
    );
    if (!validPassword) {
      return errorResponse(req, res, 'Invalid credentials.', 404);
    }
    await Users.update(
        {last_login: null},
        {where: {email: req.body.email}},
    );
    // generating Access token and storing it in header  
    const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN, {
      expiresIn: '15min',
    });
    // generating Refresh token and storing in cookie with cookie-only
    const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN, {
      expiresIn: '1d',
    });
    await res.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
    }).header('AccessToken',accessToken );
    // await res.cookie(
    //   "AccessToken",
    //   accessToken
    //   // httpOnly: true,
    // );
    
    await createLogs(user.id, 4, 'User Login', `User Login successfully`, null, user.id, req, res, next);
    await res.status(200).header('AccessToken', accessToken).json({
      error: false,
      accessToken,
      refreshToken,
      message: 'logged in successfully',
    });
    next();
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};


const logout = async (req, res, next) => {
  try {

    res.clearCookie('RefreshToken');
    // res.clearCookie("AccessToken");
    res.status(200);

    const {id: userId} = req.body;
    await Users.update(
        {last_login: new Date()},
        {where: {id: userId}},
    );
    
    await createLogs(userId, 4, 'User Logout', `User Logout successfully`, null, userId, req, res, next);
    // return res.render('message', {error: '',message: 'Logged out successfully !!!',route: '/login',text: 'Login',});
    await res.send({message: 'User logout successfully'});
    next();
  } catch (error) {
    return errorResponse(req, res, 'Error while logout user', 402);
  }
};


/* 
   Refresh function generates Access Token when needed 
  */
const refresh = async (req, res)=> {
  try {
    if (req.cookies?.RefreshToken) {
      const refreshToken = req.cookies.RefreshToken;
      // To verify that refresh token is accurate
      jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN,
          function(err) {
            if (err) {
            // If invalid Refesh Token then
              return errorResponse(req, res, 'Unauthorized', 401);
            } else {
            // If correct then generate new Access Token
              const user = Users.findOne({where: {email: req.body.email}});
              const accessToken = jwt.sign(
                  {id: user.id},
                  process.env.ACCESS_TOKEN,
                  {
                    expiresIn: '15min',
                  },
              );
              return successResponse(req, res, `Access-token:- ${accessToken}`, 201);
            }
          },
      );
    } else {
      // await createLogs(userId, 4, 'New Access Token through Refresh Token', `New access token id generated through refresh token`, null, userId, req, res, next);
      return errorResponse(req, res, 'something went wrong', 500);
    }
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
