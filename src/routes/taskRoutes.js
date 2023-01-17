/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskControllers');
const {validation} = require('../middlewares/validation/validation');
const {taskSchema} = require('../middlewares/validation/schemas');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.post('/create-task', authJwtVerify, validation(taskSchema), taskControllers.createTask);
router.put('/update-task', authJwtVerify, validation(taskSchema), taskControllers.updateTask);
router.delete('/delete-task', authJwtVerify, taskControllers.deleteTask);
router.get('/get-tasks', authJwtVerify, taskControllers.getTasks);

module.exports = router;
