const jwt = require("jsonwebtoken");
const models = require("../models");

const isAuthenticated = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (!token) return res.sendStatus(401);
    const user = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!user) return res.sendStatus(403);

    const account = await models.Account.findOne({ email: user.email });
    if (!account) return res.sendStatus(403);
    req.account = {
      id: account._id,
      email: account.email,
      isVerified: account.isVerified,
    };
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const isValidated = (req, res, next) => {
  try {
    if (!req.account) return res.sendStatus(403);

    if (!req.account.isVerified)
      return res.status(401).json({ error: "Please verify your account" });

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  isAuthenticated,
  isValidated,
};
