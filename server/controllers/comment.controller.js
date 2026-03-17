const Blog = require("../models/blog.models");
const Comment = require("../models/comment.models");

const addComment = async (req, res) => {
  try {
    /* Get blog id + logged-in user id */
    const { id } = req.params;
    const { comment } = req.body;
    const creator = req.user.id;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Please enter a comment",
      });
    }

    /* Find blog */
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    /* Create Comment */
    const addComment = await Comment.create({
      comment,
      blog: id,
      user: creator,
    });

    /* Attach comment to blog */
    await Blog.findByIdAndUpdate(id, {
      $push: { comments: addComment._id },
    });

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: addComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while commenting the blog",
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    /* Get blog id + logged-in user id */
    const { id } = req.params;
    const userId = req.user.id;

    /* Find comment + blog creator */
    const comment = await Comment.findById(id).populate({
      path: "blog",
      select: "creator",
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    /* Authorization Check */
    const isCommentOwner = comment.user.toString() === userId.toString();
    const isBlogOwner = comment.blog.creator.toString() === userId.toString();

    if (!isCommentOwner && !isBlogOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }

    /* Delete comment from Blog */
    await Comment.findByIdAndDelete(id);

    /* Remove reference from blog */
    await Blog.findByIdAndUpdate(comment.blog._id, {
      $pull: { comments: id },
    });

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting the comment",
      error: error.message,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // commentId
    const { updateComment } = req.body;

    if (!updateComment) {
      return res.status(400).json({
        success: false,
        message: "Updated comment is required",
      });
    }

    /* Find comment */
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    /* Find blog */
    const blog = await Blog.findById(comment.blog);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    /* Authorization */
    const isCommentOwner = comment.user.toString() === userId.toString();

    const isBlogOwner = blog.creator.toString() === userId.toString();

    if (!isCommentOwner && !isBlogOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this comment",
      });
    }

    /* Update comment */
    await Comment.findByIdAndUpdate(id, {
      comment: updateComment,
    });

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while editing the comment",
      error: error.message,
    });
  }
};

const likeComment = async (req, res) => {
    try {
      /* Get blog id + logged-in user id */
      const { id } = req.params;
      const userId = req.user.id;
  
      /* Find Comment */
      const comment = await Comment.findById(id);
  
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }
  
      /* Check if already liked */
      if (!comment.likes.includes(userId)) {
        await Comment.findByIdAndUpdate(id, { $push: { likes: userId } });
  
        return res.status(200).json({
          success: true,
          message: "Comment liked successfully",
        });
      } else {
        await Comment.findByIdAndUpdate(id, { $pull: { likes: userId } });
  
        return res.status(200).json({
          success: true,
          message: "Comment disliked successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while liking the Comment",
        error: error.message,
      });
    }
  };

module.exports = {
  addComment,
  deleteComment,
  editComment,
  likeComment
};
