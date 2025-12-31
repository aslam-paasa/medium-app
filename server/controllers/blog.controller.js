const Blog = require("../models/blog.models");
const User = require("../models/user.models");

const createBlog = async (req, res) => {
  try {
    const { title, description, draft, creator } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(creator);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const blog = await Blog.create({ title, description, draft, creator });
    await User.findByIdAndUpdate(creator, { $push: { blogs: blog._id } });

    return res.status(200).json({
      success: true,
      message: "Blog created successfully",
      blog: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating the blog",
      error: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false }).populate({
      path: "creator",
      select: "-password",
    });
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching the blogs",
      error: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate("creator");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching the blog",
      error: error.message,
    });
  }
};

const updateBlogById = async (req, res) => {
  const { id } = req.params;
  const { title, description, draft } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, description, draft },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the blog",
      error: error.message,
    });
  }
};

const deleteBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting the blog",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
