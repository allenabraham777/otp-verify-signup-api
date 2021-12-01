const models = require('../models');
const sgMail = require('@sendgrid/mail');
const Redis = require('ioredis');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const redis = new Redis(process.env.REDIS_URL);


const signup = async (req, res) => {
  try{
    const {email} = req.body;
    const account = await models.Account.findOne({email})
    if(!!account) {
      return res.status(400).json({account, message: 'Account already exists'});
    } else {
      const newAccount = new models.Account({
        email
      })
      await newAccount.save();
      const otp = Math.floor(100000 + Math.random() * 900000);
      const token = Math.random().toString(36).substr(2,7);
      await redis.set(`OTP_VERIFY_TOEKN_${token}`,otp);
      const msg = {
        to: email, // Change to your recipient
        from: process.env.FROM_EMAIL, // Change to your verified sender
        subject: 'Please verify your email',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<section><div>OTP for account verification is </div><h1>${otp}</h1></section>`,
      }
      await sgMail.send(msg);
      return res.json({token, message: 'OTP send successfully to your email, please use this token and OTP to verify.'});
    }
  }catch(err){
    return res.status(500);
  }
}

const login = async (req, res) => {
  res.json({success: true})
}

module.exports = {
  signup,
  login
}