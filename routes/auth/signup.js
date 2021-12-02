const express = require("express");
const Joi = require("joi");
const controllers = require("../../controllers");
const middleware = require("../../middleware");

const router = express.Router();

router.post(
  "/",
  middleware.validator({
    payload: {
      email: Joi.string().email().required(),
    },
  }),
  controllers.auth.signup
);

router.post(
  "/resend",
  middleware.validator({
    payload: {
      email: Joi.string().email().required(),
    },
  }),
  controllers.auth.resendVerify
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
  controllers.auth.verifyAccount
);

module.exports = router;
