/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();

const whiteListedIPControllers = require('../controllers/whiteListedIPControllers');
const {validation} = require('../middlewares/validation/validation');
const {whiteListedIPSchema} = require('../middlewares/validation/schemas');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.post('/create-ip', authJwtVerify, validation(whiteListedIPSchema), whiteListedIPControllers.createNewIP);
router.put('/update-ip', authJwtVerify, validation(whiteListedIPSchema), whiteListedIPControllers.updateIP);
router.put('/toggle-ip', authJwtVerify, whiteListedIPControllers.toggleIP);
router.put('/restore-IP', authJwtVerify, whiteListedIPControllers.restoreIP);
router.delete('/delete-ip', authJwtVerify, whiteListedIPControllers.deleteIP);

module.exports = router;
