/* eslint-disable max-len */
const {successResponse, errorResponse} = require('../helpers');
const db = require('../models');
const Users = db.Users;
const {getPagination, getPagingData} = require('../helpers/pagination');
const {ACTIVE, DEACTIVE} = require('../constants/constant');
// const Op = db.Sequelize.Op;


const getUsers = async (req, res) => {
  try {
    const {page, size} = req.body;
    const {limit, offset} = getPagination(page, size);
  /*
  findAndCount function display data and also count number of items 
  limit ->  how many to take
  offset -> how many records to skip
  */
    Users.findAndCountAll({limit, offset}).then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response)

    });
  } catch (err) {
    return errorResponse(req, res, 'Error while getting Users data.', 500);
  }
};


const deleteUser = async (req, res) => {
  try {
    const idExist = await Users.findOne({where: {id: req.body.id}});
    if (!idExist) {
      return res.send('Id not exist or record is already soft deleted');
    }
    await Users.destroy({
      where: {id: req.body.id},
      // force: true, // For hard delete
    });
    return successResponse(req, res, 'Record is deleted', 202);
  } catch (err) {
    return errorResponse(req, res, 'Error while deleting Users data.', 500);
  }
};


const restoreUser = async (req, res) => {
  try {
    await Users.restore({
      where: {id: req.body.id},
    });
    return successResponse(req, res, 'Record is restored', 200);
  } catch (err) {
    return errorResponse(req, res, 'Error while restoring Users data.', 500);
  }
};


const toggleUser = async (req, res) => {
  try {
    const User = await Users.findOne({where: {id: req.body.id}});

    const status = User.status === ACTIVE ? DEACTIVE : ACTIVE;
    
    await Users.update(
        {status: User.status == ACTIVE ? DEACTIVE : ACTIVE},
        {where: {id: req.body.id}},
    );
    return successResponse(req, res, `Users status ${status} successfully`, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while changing users status', 500);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  restoreUser,
  toggleUser,
};
