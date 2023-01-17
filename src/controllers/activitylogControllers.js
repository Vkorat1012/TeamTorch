/* eslint-disable camelcase */
/* eslint-disable max-len */
const {v4: uuidv4} = require('uuid'); // used for generate unique id best on version - 4 as uuidv4
const {errorResponse} = require('../helpers');
const db = require('../models');
const {Activity_logs} = db;
// 
const createLogs = async (user_id, module_id, action, description, previous_log, updated_by, req, res, next) => {
  try {
    await Activity_logs.create({
      id: uuidv4(),
      user_id,
      module_id,
      action,
      description,
      previous_log,
      updated_log: JSON.stringify(req.headers),
      updated_by,
    });
    next();
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};
module.exports = {createLogs};
