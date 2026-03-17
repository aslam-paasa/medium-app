const Blog = require("../models/blog.models");
const User = require("../models/user.models");

const createBlog = async (req, res) => {
  try {
    const { title, description, draft } = req.body;
    const creator = req.user.id; /* verifyJWT return req.user */

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

    const blog = await Blog.create({
      title,
      description,
      draft,
      creator,
    });

    await User.findByIdAndUpdate(creator, {
      $push: { blogs: blog._id },
    });

    return res.status(201).json({
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

const updateBlogById = async (req, res) => {
  try {
    /* login user from auth token & update data */
    const creator = req.user.id;
    const { id } = req.params;
    const { title, description, draft } = req.body;

    /* Find Blog */
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    /* Auth check — sirf creator update kar sakta hai */
    if (blog.creator.toString() !== creator) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized for this action",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title || blog.title,
        description: description || blog.description,
        draft: draft ?? blog.draft,
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
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
  try {
    /* Get blog id + logged-in user id */
    const { id } = req.params;
    const creator = req.user.id;

    /* Find blog */
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    /* Check ownership */
    if (blog.creator.toString() !== creator) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    /* Delete blog */
    await Blog.findByIdAndDelete(id);

    /* Remove blog reference from user */
    await User.findByIdAndUpdate(blog.creator, {
      $pull: { blogs: blog._id },
    });

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting the blog",
      error: error.message,
    });
  }
};

const likeBlogById = async (req, res) => {
  try {
    /* Get blog id + logged-in user id */
    const { id } = req.params;
    const creator = req.user.id;

    /* Find blog */
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    /* Check if already liked */
    if (!blog.likes.includes(creator)) {
      await Blog.findByIdAndUpdate(id, { $push: { likes: creator } });

      return res.status(200).json({
        success: true,
        message: "Blog liked successfully",
      });
    } else {
      await Blog.findByIdAndUpdate(id, { $pull: { likes: creator } });

      return res.status(200).json({
        success: true,
        message: "Blog disliked successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while liking the blog",
      error: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false })
      .populate({
        path: "creator",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "email name",
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
    const blog = await Blog.findById(id).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email",
      },
    });

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

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById
};
