const express = require("express");
const controllers = require("../../controllers");
const middleware = require("../../middleware");
const Joi = require("joi");

const router = express.Router();

router.post(
  "/",
  middleware.validator({
    payload: {
      email: Joi.string().email().required(),
    },
  }),
  controllers.auth.login
);

router.post(
  "/verify",
  middleware.validator({
    payload: {
      email: Joi.string().email().required(),
      token: Joi.string().required(),
      otp: Joi.number().required()
    },
  }),
  controllers.auth.verifyLogin
);

module.exports = router;
