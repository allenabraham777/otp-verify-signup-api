const express = require("express");
const Joi = require("joi");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = express.Router();

router.put(
  "/",
  middleware.validator({
    payload: {
      email: Joi.string().email().required(),
      first_name:  Joi.string().required(),
      last_name: Joi.string().required()
    },
  }),
  middleware.auth.isAuthenticated,
  middleware.auth.isValidated,
  controllers.auth.updateProfile
);

module.exports = router;