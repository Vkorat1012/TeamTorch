/* eslint-disable camelcase */
const db = require('../models');
const {Roles_permissions} = db;
const {successResponse, errorResponse} = require('../helpers');

exports.RPGet = async (req, res ) => {
  try {
    const result = await Roles_permissions.findAll({});
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching roles', 500);
  }
};
