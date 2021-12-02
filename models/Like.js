const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  liked: Boolean,
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
