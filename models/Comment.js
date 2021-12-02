const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: String,
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
