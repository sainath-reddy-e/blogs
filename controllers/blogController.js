import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public

const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
});
// @desc    Fetch single blog
// @route   GET /api/blog/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});
// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.remove();
    res.json({ mesage: "blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});
// @desc    Create a blog
// @route   POST /api/blog
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const blog = new Blog({
    title,
    description,
    user: req.user._id,
  });

  const createdBlog = await blog.save();

  res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.description = description;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});
export { createBlog, updateBlog, getBlogs, getBlogById, deleteBlog };
