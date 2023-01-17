const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  const token = req.header('AccessToken');  
  if (!token) {
    return res
        .status(401)
        .send('Access Denied because you do not have an authorization token');
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN);
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};
