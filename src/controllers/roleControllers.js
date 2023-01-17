/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const db = require('../models');
const {Roles} = db;
const {Roles_permissions} = db;
const {successResponse, errorResponse} = require('../helpers');
const {ACTIVE, DEACTIVE} = require('../constants/constant');


const createRole = async (req, res ) => {
  try {
    const val = {...req.body};
    const role = await Roles.create(val);
    const permission_array = req.body.permissions;
    /* 
    This is sequelize command to add data in pivot table(Roles_permissions) through Role and Permission table 
    */
    await role.addPermissions(permission_array, {through: Roles_permissions});  
    return successResponse(req, res, role, 201);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating role ', 500);
  }
};


const updateRole = async (req, res ) => {
  try {
    const val = {...req.body};
    await Roles.update(val,
        {where: {id: req.body.id}},
    );
    const secondLoad = await Roles.findOne({where: {id: req.body.id}});
/*
  for updating permission which is allocated to role first remove all
  the permissions attached to the role and than add permissions in pivot table
     */
    await Roles_permissions.destroy({where: {role_id: req.body.id}});
      // Permission array
    const permissions = req.body.permissions;    
      // Give permissions to Role
    await secondLoad.addPermissions(permissions, {
      through: Roles_permissions,
    });

    return successResponse(req, res, 'role updated', 201);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating role ', 500);
  }
};


const getRoles = async (req, res ) => {
  try {
    const roles = await Roles.findAll();
    return successResponse(req, res, roles, 200);
  } catch (err) {
    return errorResponse(req, res, 'Error while fetching roles', 500);
  }
};


const toggleRole = async (req, res ) => {
  try {
    const Role = await Roles.findOne({where: {id: req.body.id}});
    
    const status = Role.status === ACTIVE ? DEACTIVE : ACTIVE;

    await Roles.update(
      {status: Role.status == ACTIVE ? DEACTIVE : ACTIVE},
        {where: {id: req.body.id}},
    );
    return successResponse(req, res, `role status ${status} successfully`, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching roles', 500);
  }
};

module.exports = {
  createRole,
  updateRole,
  getRoles,
  toggleRole,
};
