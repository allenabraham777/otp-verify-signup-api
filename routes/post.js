const express = require("express");
const Joi = require("joi");
const controllers = require("../controllers");
const middleware = require("../middleware");

const router = express.Router();

router.post(
  "/",
  middleware.validator({
    payload: {
      content: Joi.string().required(),
    },
  }),
  middleware.auth.isAuthenticated,
  middleware.auth.isValidated,
  controllers.post.createPost
);

router.delete(
  "/:post_id",
  middleware.validator({
    params: {
      post_id: Joi.string().required(),
    },
  }),
  middleware.auth.isAuthenticated,
  middleware.auth.isValidated,
  controllers.post.deletePost
);

router.post(
  "/:post_id/comments",
  middleware.validator({
    payload: {
      comment: Joi.string().required(),
    },
    params: {
      post_id: Joi.string().required(),
    }
  }),
  middleware.auth.isAuthenticated,
  middleware.auth.isValidated,
  controllers.post.postComment
);

router.delete(
  "/:post_id/comments/:comment_id",
  middleware.validator({
    params: {
      post_id: Joi.string().required(),
      comment_id: Joi.string().required(),
    },
  }),
  middleware.auth.isAuthenticated,
  middleware.auth.isValidated,
  controllers.post.deleteComment
);

router.post(
  "/:post_id/like",
  middleware.validator({
    params: {
      post_id: Joi.string().required(),
    },
  }),
  middleware.auth.isAuthenticated,
  middleware.auth.isValidated,
  controllers.post.likePost
);

module.exports = router;