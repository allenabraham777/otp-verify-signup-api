const models = require('../models');
const utils = require('../utils');
const sgMail = require('@sendgrid/mail');
const Redis = require('ioredis');

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
      await redis.set(`SIGNUP_OTP_VERIFY_TOEKN_${email}_${token}`, otp, 'ex', 300);
      const msg = {
        to: email, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Please verify your email',
        text: 'and easy to do anywhere, even with Node.js',
        html: utils.templates.verifyAccountEmail(otp),
      }
      await sgMail.send(msg);
      return res.statius(200).json({token, message: 'OTP send successfully to your email, please use this token and OTP to verify. OTP expires in 5 min'});
    }
  }catch(err){
    return res.status(500);
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
      await redis.set(`SIGNUP_OTP_VERIFY_TOEKN_${email}_${token}`, otp, 'ex', 300);
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
    console.error(err);
    return res.status(500);
  }
}

const verifyAccount = async (req, res) => {
  try {
    const { email, otp, token } = req.body;
    const account = await models.Account.findOne({email});
    if(!account) {
      return res.status(404).json({error: 'Invalid request'});
    }
    const realOtp = await redis.get(`SIGNUP_OTP_VERIFY_TOEKN_${email}_${token}`);
    if(realOtp && parseInt(realOtp) === otp) {
      await account.update({isVerified: true});
      await redis.del(`SIGNUP_OTP_VERIFY_TOEKN_${email}_${token}`);
      return res.status(200).json({message: 'Account verifed successfully'});
    } else {
      return res.status(400).json({error: 'Invalid request'});
    }
  } catch(eror){
    console.error(err);
    return res.status(500);
  }
}

const login = async (req, res) => {
  res.json({success: true})
}

module.exports = {
  signup,
  login,
  verifyAccount,
  resendVerify,
}