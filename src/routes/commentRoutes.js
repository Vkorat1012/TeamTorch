/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const {validation} = require('../middlewares/validation/validation');
const {commentSchema} = require('../middlewares/validation/schemas');
const commentControllers = require('../controllers/commentControllers');
const authJwtVerify = require('../middlewares/authentication/authJwtVerify');

router.post('/create-comment', authJwtVerify, validation(commentSchema), commentControllers.createComment);
router.put('/update-comment', authJwtVerify, validation(commentSchema), commentControllers.updateComment);
router.delete('/delete-comment', authJwtVerify, commentControllers.deleteComment);

module.exports = router;
