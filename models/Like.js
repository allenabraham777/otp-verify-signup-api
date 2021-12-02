const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  liked: {
    type: Boolean,
    required: true
  },
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
});

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
