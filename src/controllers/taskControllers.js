/* eslint-disable max-len */
const db = require('../models');
const {Tasks} = db;
const {v4: uuidv4} = require('uuid'); // used for generate unique id best on version - 4 as uuidv4
const {successResponse, errorResponse} = require('../helpers');

// Tasks
const createTask = async (req, res) => {
  try {
    const val = {...req.body, id: uuidv4()};
    const result = await Tasks.create(val);
    return successResponse(req, res, result, 201);
  } catch (err) {
    return errorResponse(req, res, 'Error while creating task', 500);
  }
};

const getTasks = async (req, res ) => {
  try {
    const result = await Tasks.findAll();
    return successResponse(req, res, result, 200);
  } catch (err) {
    return errorResponse(req, res, 'Error while fetching task ', 500);
  }
};

const updateTask = async (req, res ) => {
  try {
    const val = {...req.body, updated_at: new Date()};
    await Tasks.update(val,
        {where: {id: req.body.id}},
    );
    const result = await Tasks.findOne({where: {id: req.body.id}});
    return successResponse(req, res, result, 201);
  } catch (err) {
    return errorResponse(req, res, 'Error while upating task ', 500);
  }
};

const deleteTask = async (req, res ) => {
  try {
    await Tasks.destroy({
      where: {id: req.body.id},
      // force: true, // For hard delete
    });
    return successResponse(req, res, `task deleted Successfully`, 202);
  } catch (err) {
    return errorResponse(req, res, 'Error while deleting task ', 500);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
