/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const permissionControllers = require('../controllers/permissionControllers');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.post('/create-permission', authJwtVerify, permissionControllers.createPermissions);
router.get('/get-permissions', authJwtVerify, permissionControllers.getPermissions);
router.put('/update-permission', authJwtVerify, permissionControllers.updatePermission);
router.delete('/delete-permission', authJwtVerify, permissionControllers.deletePermission);

module.exports = router;
