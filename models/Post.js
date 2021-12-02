const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: String,
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
