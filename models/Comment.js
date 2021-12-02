const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
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

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
