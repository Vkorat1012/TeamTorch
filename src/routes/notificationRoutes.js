/* eslint-disable new-cap */
/* eslint-disable max-len */

const express = require('express');
const router = express.Router();
const notificationControllers = require('../controllers/notificationControllers');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.post('/create-notification', authJwtVerify, notificationControllers.createNotification);
router.get('/get-notifications', authJwtVerify, notificationControllers.getNotifications);
router.put('/read-notification/:id', authJwtVerify, notificationControllers.readNotification);
router.put('/read-all-notifications', authJwtVerify, notificationControllers.readAllNotification);
router.delete('/delete-all-notifications', authJwtVerify, notificationControllers.deleteAllNotifications);


module.exports = router;
