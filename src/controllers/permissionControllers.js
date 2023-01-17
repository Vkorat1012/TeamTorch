/* eslint-disable max-len */
const db = require('../models');
const {Permissions} = db;
const {successResponse, errorResponse} = require('../helpers');

const createPermissions = async (req, res ) => {
  try {
    const val = {...req.body}; // spread operator
    const result = await Permissions.create(val);
    return successResponse(req, res, result, 201);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating permission ', 500);
  }
};


const getPermissions = async (req, res ) => {
  try {
    const result = await Permissions.findAll();
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching permissions', 500);
  }
};


const updatePermission = async (req, res ) => {
  try {
    await Permissions.update(
        {
          module_id: req.body.module_id,
          name: req.body.name,
          slug: req.body.slug,
        },
        {where: {id: req.body.id}},
    );
    const result = await Permissions.findAll({where: {id: req.body.id}});
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while updating fields of permission', 500);
  }
};


const deletePermission = async (req, res ) => {
  try {
    await Permissions.destroy({
      where: {id: req.body.id},
      // force: true, // For hard delete
    });
    return successResponse(req, res, `Permission deleted Successfully`, 202);
  } catch (err) {
    return errorResponse(req, res, 'Error while deleting permission', 500);
  }
};

module.exports = {
  createPermissions,
  getPermissions,
  updatePermission,
  deletePermission,
};
