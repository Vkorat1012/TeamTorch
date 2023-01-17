/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const moduleControllers = require('../controllers/moduleControllers');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.put('/toggle-module', authJwtVerify, moduleControllers.toggleModule);
module.exports = router;
