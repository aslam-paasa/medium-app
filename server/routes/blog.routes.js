const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blog.controller");
const verifyUser = require("../middlewares/auth");

const blogRoutes = express.Router();

blogRoutes.post("/blog", verifyUser, createBlog);
blogRoutes.get("/blogs", getAllBlogs);
blogRoutes.get("/blog/:id", getBlogById);
blogRoutes.patch("/blog/:id", verifyUser, updateBlogById);
blogRoutes.delete("/blog/:id", verifyUser, deleteBlogById);

module.exports = blogRoutes;
