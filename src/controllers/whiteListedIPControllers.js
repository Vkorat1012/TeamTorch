/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const db = require('../models');
const {White_listed_ip} = db;
const {v4: uuidv4} = require('uuid'); // used for generate unique id based on version -4 as uuidv4
const {successResponse, errorResponse} = require('../helpers');
const {ACTIVE, DEACTIVE} = require('../constants/constant');


const createNewIP = async (req, res) => {
  try {
    const val = {...req.body, id: uuidv4()};

    const ipExist = await White_listed_ip.findOne({
      where: {ip: req.body.ip},
    });
    if (ipExist) {
      return errorResponse(req, res, `This IP adress is already registered`, 409);
    }
    const result = await White_listed_ip.create(val);
    return successResponse(req, res, result, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while creating notification', 500);
  }
};


const updateIP = async (req, res) => {
  try {
    const val = {...req.body};
    // As IP address is unique, hence we need to check is that unique or not
    const ipExist = await White_listed_ip.findOne({
      where: {ip: req.body.ip},
    });
    // if (ipExist) {
    //   return errorResponse(req, res, `This IP adress is already registered`, 409);
    // }
    await White_listed_ip.update(val,
        {
          where: {
            id: req.body.id,
          },
        },
    );
    return successResponse(req, res, 'IP address modified successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while updating fields of permission ', 500);
  }
};


const toggleIP = async (req, res ) => {
  try {
    const IP = await White_listed_ip.findOne({where: {id: req.body.id}});

    const status = IP.status === ACTIVE ? DEACTIVE : ACTIVE;
    
    await White_listed_ip.update(
        {status: IP.status === ACTIVE ? DEACTIVE : ACTIVE},
        {where: {id: req.body.id}},
    );

    return successResponse(req, res, `Ip status ${status} successfully`, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while changing users status', 500);
  }
};


const deleteIP = async (req, res ) => {
  try {
    await White_listed_ip.destroy({
      where: {id: req.body.id},
      // force: true, // For hard delete
    });
    return successResponse(req, res, 'Ip address is removed from white IP adreeses list', 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while deleting IP adress', 500);
  }
};


const restoreIP = async (req, res ) => {
  try {
    await White_listed_ip.restore({
      where: {id: req.body.id},
      // force :true  it applies hard delete
    });
    return successResponse(req, res, 'Ip address is restored', 200);
  } catch (err) {
    return errorResponse(req, res, 'Error while restoring IP address', 500);
  }
};


module.exports = {
  createNewIP,
  updateIP,
  toggleIP,
  deleteIP,
  restoreIP,
};
