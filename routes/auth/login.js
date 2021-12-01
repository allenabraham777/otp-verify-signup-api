const express = require('express');
const controllers = require('../../controllers');

const router = express.Router();


router.post('/', controllers.auth.login);

module.exports = router;
