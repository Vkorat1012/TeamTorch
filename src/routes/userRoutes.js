/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const {validation} = require('../middlewares/validation/validation');
const {userSchema, loginSchema} = require('../middlewares/validation/schemas');
// const {validateEmail} = require("../helpers/")
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

// Authentication
router.post('/register', validation(userSchema), authController.register);
router.post('/login', validation(loginSchema), authController.login);
router.put('/logout', authJwtVerify, authController.logout);
router.post('/refresh', authController.refresh);

// Users Operations
router.get('/get-users', userControllers.getUsers);
router.delete('/delete-user', authJwtVerify, userControllers.deleteUser);
router.put('/restore-user', authJwtVerify, userControllers.restoreUser);
router.put('/toggle-user', authJwtVerify, userControllers.toggleUser);

module.exports = router;
