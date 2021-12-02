const models = require("../models");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new models.Post({
      content,
      account_id: req.account.id,
    });
    const newPost = await post.save();
    return res
      .status(200)
      .json({
        success: true,
        post: { id: newPost._id, content: newPost.content },
      });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const deletePost = async (req, res) => {
  try {
    const { post_id: _id } = req.params;
    const account_id = req.account.id;
    const post = await models.Post.findOne({ _id, account_id });
    if (!post)
      res.status(404).json({ error: "No such post for current account" });
    await post.delete();
    return res
      .status(200)
      .json({ message: `Post ${_id} deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const likePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    const account_id = req.account.id;
    const post = await models.Post.findOne({ _id: post_id });
    if (!post) return res.status(404).json({ error: "No such post" });
    const like = await models.Like.findOne({ post_id, account_id });
    if (!!like) {
      await like.update({ liked: !like.liked });
    } else {
      const newLike = new models.Like({ liked: true, post_id, account_id });
      await newLike.save();
    }
    return res.status(200).json({ message: `Success` });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const postComment = async (req, res) => {
  return res.status(200).json({success: true})
  try {
    const { post_id } = req.params;
    const { comment } = req.body;
    const account_id = req.account.id;
    const post = await models.Post.findOne({ _id: post_id });
    if (!post) return res.status(404).json({ error: "No such post" });
    const newComment = new models.Comment({ comment, account_id, post_id });
    const addedComment = await newComment.save();
    return res
      .status(200)
      .json({
        message: `Success`,
        comment: {
          id: addedComment._id,
          comment: addedComment.comment,
          post_id: addedComment.post_id,
        },
      });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { post_id, comment_id: _id } = req.params;
    const account_id = req.account.id;
    const comment = await models.Comment.findOne({ _id, post_id, account_id });
    if (!comment) return res.status(404).json({ error: "No such comment" });
    await comment.delete();
    return res
      .status(200)
      .json({
        message: `Deleted Comment ${_id}`
      });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  createPost,
  deletePost,
  likePost,
  postComment,
  deleteComment,
};
