const express = require("express");
const Blog = require("../models/blog.models");

const blogRoutes = express.Router();

/**
 * Author
 * 1. Method: POST
 * 2. Route: '/blogs'
 * 3. Description: All Blog
 */
blogRoutes.post("/blogs", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const blog = new Blog({ title, content, author });
  await blog.save();
  return res.json({ message: "Blog created successfully!", blog });
});

/**
 * Author
 * 1. Method: GET
 * 2. Route: '/blogs'
 * 3. Description: Retrieve all blogs
 */
blogRoutes.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  return res.json({ blogs: blogs });
});

/**
 * Author
 * 1. Method: GET
 * 2. Route: '/blogs/:id'
 * 3. Description: Retrieve particular blog by id
 */
blogRoutes.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const searchBlogById = await Blog.findById(id);
  return res.json({ searchBlogById });
});

/**
 * Author
 * 1. Method: PATCH
 * 2. Route: '/blogs/:id'
 * 3. Description: Update particular blog by id
 */
blogRoutes.patch("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  /**
   * Approach-1: findIndex
   * Copy previous content and then override on that content.
   * Isse ye hoga ki agar request blank aaegi to data wahi rahega.
   */

  // let index = BLOGS.findIndex(blog => blog.id == id);
  // BLOGS[index] = {...BLOGS[index], ...req.body}
  // return res.json({ message: "Blog updated successfully!"});

  /**
   * Approach-2: Map()
   * Agar blog.id == id hai to update kr do, otherwise prev BLOGS
   * ko hi return kr do
   */
  const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  return res.json({ message: "Blog updated successfully!", updateBlog });
});

/**
 * Author
 * 1. Method: DELETE
 * 2. Route: '/blogs/:id'
 * 3. Description: Delete particular blog by id
 */
blogRoutes.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const deleteBlog = await Blog.findByIdAndDelete(id);
  return res.json({ message: "Blog deleted successfully!", deleteBlog });
});

module.exports = blogRoutes;
