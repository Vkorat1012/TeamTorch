/* eslint-disable max-len */
// used for generate unique id best on version - 4 as uuidv4
const {v4: uuidv4} = require('uuid');
const {successResponse, errorResponse} = require('../helpers');
const db = require('../models');
const {Notifications} = db;
const {createLogs} = require('../controllers/activitylogControllers');

// This function retrives all comments which belongs to specific user (login user)
const getNotifications = async (req, res) => {
  try {
    const result = await Notifications.findAll({
      where: {user_id: req.body.user_id},
    });
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while retriving notifications', 500);
  }
};


const createNotification = async (req, res, next) => {
  try {
    // retrive client's data and store it into val variable
    const val = {...req.body, id: uuidv4()};
    const newNotification = await Notifications.create(val);

    // Calling activity logs service
    await createLogs(req.body.user_id, '2', 'Create Notifiaction', `the notification has been created for user id ${req.body.user_id}`, null, '1A', req, res, next );
    return successResponse(req, res, newNotification, 201);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating notifications', 500);
  }
};


const readNotification = async (req, res, next) => {
  try {
    await Notifications.update(
        {is_read: 1},
        {where: {id: req.params.id}}, //  params method to retrive data from url
    );
    await createLogs('1A', '1', 'Read Notifiaction', 'the notification has been read', null, '1A', req, res, next );
    await successResponse(req, res, `notification read`, 200);
  } catch (error) {
    return errorResponse( req, res, 'Error while viewing notification', 500);
  }
};


const readAllNotification = async (req, res, next) => {
  try {
    await Notifications.update(
        {is_read: true},
        {where: {user_id: req.body.user_id}},
    );
    await createLogs(req.body.user_id, '2', 'Read All Notifiaction', `All notifications have been read for user id ${req.body.user_id}`, null, '1A', req, res, next);
    await successResponse(req, res, `All notification have read for login user`, 200);
    next();
  } catch (error) {
    return errorResponse( req, res, 'Error while viewing all notification', 500);
  }
};


const deleteAllNotifications = async (req, res, next) => {
  try {
    await Notifications.destroy({
      where: {user_id: req.body.user_id},
      // force: true, // For hard delete from database
    });
    await createLogs(req.body.user_id, '2', 'Clear Notifiactions', `All notifications have been cleared for user id ${req.body.user_id}`, null, '1A', req, res, next);
    await successResponse(req, res, `All notifications cleared Successfully`, 200);
    next();
  } catch (err) {
    return errorResponse( req, res, 'Error while deleting Notifications', 500);
  }
};

module.exports = {
  getNotifications,
  createNotification,
  readNotification,
  readAllNotification,
  deleteAllNotifications,
};
