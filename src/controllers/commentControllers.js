/* eslint-disable max-len */
const db = require('../models');
const {Comments} = db;
const {v4: uuidv4} = require('uuid'); // used for generate unique id based on version - 4 as uuidv4
const {successResponse, errorResponse} = require('../helpers');


const createComment = async (req, res) => {
  try {
    const val = {...req.body, id: uuidv4()};
    const newComment = await Comments.create(val);
    return successResponse(req, res, newComment, 201);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating comment', 500);
  }
};


const updateComment = async (req, res) => {
  try {
    const val = {...req.body};
    await Comments.update(val,
        {where: {id: req.body.id}},
    );
    const updatedComment = await Comments.findOne({
      where: {id: req.body.id},
    });
    return successResponse(req, res, updatedComment, 201);
  } catch (err) {
    return errorResponse(req, res, 'Error while updating comment', 500);
  }
};


const deleteComment = async (req, res) => {
  try {
    await Comments.destroy({
      where: {id: req.body.id}, force: true, // For hard delete
    });
    return successResponse(req, res, 'Comment deleted successfully', 200);
  } catch (err) {
    return errorResponse(req, res, 'Error while deleting comment', 500);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
