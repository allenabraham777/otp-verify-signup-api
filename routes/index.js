const express = require('express');
const authRouter = require('./auth');
const accountRouter = require('./account');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/account', accountRouter);

module.exports = router;
