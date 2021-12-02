const express = require("express");
const Joi = require("joi");
const controllers = require("../../controllers");
const middleware = require("../../middleware");

const router = express.Router();

router.put(
  "/",
  middleware.validator({
    payload: {
      email: Joi.string().email().required(),
    },
  }),
  controllers.auth.signup
);
