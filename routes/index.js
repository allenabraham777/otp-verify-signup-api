const express = require('express');
const authRouter = require('./auth');
const accountRouter = require('./account');
const postRouter = require('./post');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/posts', postRouter);

module.exports = router;
