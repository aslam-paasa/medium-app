const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blog.controller");

const blogRoutes = express.Router();

blogRoutes.post("/blog", createBlog);
blogRoutes.get("/blogs", getAllBlogs);
blogRoutes.get("/blog/:id", getBlogById);
blogRoutes.patch("/blog/:id", updateBlogById);
blogRoutes.delete("/blog/:id", deleteBlogById);

module.exports = blogRoutes;
