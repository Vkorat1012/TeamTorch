/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
const {successResponse, errorResponse} = require('../helpers');
const db = require('../models');
const {Modules} = db;
const {ACTIVE, DEACTIVE} = require('../constants/constant');



const toggleModule = async (req, res) => {
  try {
    const module = await Modules.findOne({where: {id: req.body.id}});

    const status = module.status === ACTIVE ? DEACTIVE : ACTIVE; 
    
    await Modules.update(
        {status: module.status === ACTIVE ? DEACTIVE : ACTIVE},
        {where: {id: req.body.id}},
    );
    return successResponse(req, res, `Module status ${status} successfully`, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while changing users status', 500);
  }
};

module.exports = {
  toggleModule,
};
