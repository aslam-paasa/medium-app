const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
} = require("../controllers/blog.controller");
const {
  addComment,
  editComment,
  deleteComment,
  likeComment,
} = require("../controllers/comment.controller");
const verifyUser = require("../middlewares/auth");

const blogRoutes = express.Router();

/* 1. Blog APIs */
blogRoutes.post("/blog", verifyUser, createBlog);
blogRoutes.get("/blogs", getAllBlogs);
blogRoutes.get("/blog/:id", getBlogById);
blogRoutes.patch("/blog/:id", verifyUser, updateBlogById);
blogRoutes.delete("/blog/:id", verifyUser, deleteBlogById);

/* 2. Like API */
blogRoutes.post("/blog/like/:id", verifyUser, likeBlogById);

/* 3. Comment APIs */
blogRoutes.post("/blog/comment/:id", verifyUser, addComment);
blogRoutes.delete("/blog/comment/:id", verifyUser, deleteComment);
blogRoutes.patch("/blog/edit-comment/:id", verifyUser, editComment);
blogRoutes.post("/blog/like-comment/:id", verifyUser, likeComment);

module.exports = blogRoutes;
