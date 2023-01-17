/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const roleControllers = require('../controllers/roleControllers');
const {validation} = require('../middlewares/validation/validation');
const {roleSchema} = require('../middlewares/validation/schemas');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.post('/create-role', authJwtVerify, validation(roleSchema), roleControllers.createRole);
router.put('/update-role', authJwtVerify, validation(roleSchema), roleControllers.updateRole);
router.get('/get-roles', authJwtVerify, roleControllers.getRoles);
router.put('/toggle-role', authJwtVerify, roleControllers.toggleRole);

module.exports = router;
