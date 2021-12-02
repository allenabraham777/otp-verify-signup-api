const models = require('../models');
const utils = require('../utils');
const sgMail = require('@sendgrid/mail');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const redis = new Redis(process.env.REDIS_URL);

const signup = async (req, res) => {
  try{
    const {email} = req.body;
    const account = await models.Account.findOne({email})
    if(!!account) {
      return res.status(400).json({error: 'Account already exists'});
    } else {
      const newAccount = new models.Account({
        email
      })
      const savedAccount = await newAccount.save();
      const otp = Math.floor(100000 + Math.random() * 900000);
      const token = Math.random().toString(36).substr(2,7);
      await redis.set(`SIGNUP_OTP_VERIFY_TOKEN_${email}_${token}`, otp, 'ex', 300);
      const msg = {
        to: email, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Please verify your email',
        text: 'and easy to do anywhere, even with Node.js',
        html: utils.templates.verifyAccountEmail(otp),
      }
      await sgMail.send(msg);
      return res.status(200).json({token, message: 'OTP send successfully to your email, please use this token and OTP to verify. OTP expires in 5 min'});
    }
  }catch(err){
    return res.sendStatus(500);
  }
}

const resendVerify = async (req, res) => {
  try{
    const {email} = req.body;
    const account = await models.Account.findOne({email})
    if(!account) {
      return res.status(404).json({error: "Account dosen't exists"});
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const token = Math.random().toString(36).substr(2,7);
      await redis.set(`SIGNUP_OTP_VERIFY_TOKEN_${email}_${token}`, otp, 'ex', 300);
      const msg = {
        to: email, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Please verify your email',
        text: 'Please provide the OTP to signup',
        html: utils.templates.verifyAccountEmail(otp),
      }
      await sgMail.send(msg);
      return res.status(200).json({token, message: 'OTP send successfully to your email, please use this token and OTP to verify. OTP expires in 5 min'});
    }
  }catch(err){
    console.error(err);
    return res.sendStatus(500);
  }
}

const verifyAccount = async (req, res) => {
  try {
    const { email, otp, token } = req.body;
    const account = await models.Account.findOne({email});
    if(!account) {
      return res.status(404).json({error: 'Invalid request'});
    }
    const realOtp = await redis.get(`SIGNUP_OTP_VERIFY_TOKEN_${email}_${token}`);
    if(realOtp && parseInt(realOtp) === otp) {
      await account.update({isVerified: true});
      await redis.del(`SIGNUP_OTP_VERIFY_TOKEN_${email}_${token}`);
      return res.status(200).json({message: 'Account verifed successfully'});
    } else {
      return res.status(400).json({error: 'Invalid request'});
    }
  } catch(eror){
    console.error(err);
    return res.sendStatus(500);
  }
}

const login = async (req, res) => {
  try{
    const {email} = req.body;
    const account = await models.Account.findOne({email})
    if(!account) {
      return res.status(404).json({error: 'Please create an account'});
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const token = Math.random().toString(36).substr(2,7);
      await redis.set(`LOGIN_OTP_VERIFY_TOKEN_${email}_${token}`, otp, 'ex', 300);
      const msg = {
        to: email, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Please provide otp to login',
        text: 'Please provide the OTP to login',
        html: utils.templates.verifyLoginEmail(otp),
      }
      await sgMail.send(msg);
      return res.status(200).json({token, message: 'OTP send successfully to your email, please use this token and OTP to verify. OTP expires in 5 min'});
    }
  }catch(err){
    return res.sendStatus(500);
  }
}

const verifyLogin = async (req, res) => {
  try {
    const { email, otp, token } = req.body;
    const account = await models.Account.findOne({email});
    if(!account) {
      return res.status(404).json({error: 'Invalid request'});
    }
    const realOtp = await redis.get(`LOGIN_OTP_VERIFY_TOKEN_${email}_${token}`);
    if(realOtp && parseInt(realOtp) === otp) {
      const user = {
        id: account._id,
        email: account.email
      }
      const authToken = jwt.sign(user, process.env.TOKEN_SECRET);
      await redis.del(`LOGIN_OTP_VERIFY_TOKEN_${email}_${token}`);
      const response = {
        message: 'User authenticated successfully',
        token: authToken
      }
      if(!account.isVerified) {
        response.isVerified = false;
        response.alert = 'Please verify your account';
      }
      return res.status(200).json(response);
    } else {
      return res.status(400).json({error: 'Invalid request'});
    }
  } catch(eror){
    console.error(err);
    return res.sendStatus(500);
  }
}

const updateProfile = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body; 
    const account = models.Account.findOne({_id: req.account.id, email});
    if(!account) return res.sendStatus(404);
    await account.update({first_name, last_name});
    return res.status(201).json({message: 'Account updated sucessfully'});
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

module.exports = {
  signup,
  login,
  verifyAccount,
  resendVerify,
  verifyLogin,
  updateProfile,
}