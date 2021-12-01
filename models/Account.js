const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  email: String,
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
