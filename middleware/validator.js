const Joi = require("joi");

module.exports =
  ({ payload, params }) =>
  async (req, res, next) => {
    let status;
    if (payload) {
      status = Joi.object(payload).validate(req.body);
      if (status.error) {
        return res.status(400).json({
          error: `Payload Error: ${status.error.details[0].message}`,
        });
      }
      next();
    }
    if (params) {
      status = Joi.object(params).validate(req.body);
      if (status.error) {
        return res.status(400).json({
          error: `Param Error: ${status.error.details[0].message}`,
        });
      }
      next();
    }
  };
