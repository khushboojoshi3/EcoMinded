import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createBlog = async (req, res, next) => {
  const newBlog = new Blog(req.body);
  const userId = req.params.userid;
  try {
    const savedBlog = await newBlog.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { blogs: savedBlog._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedBlog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    await Blog.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { blogs: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Blog has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const author = await User.findById(blog.author);
    const obj = {
      data: blog,
      author: {
        name: author.username,
        id: author._id,
        photo: author.photo,
      },
    };
    res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    const obj = [];
    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];
      const author = await User.findById(blog.author);
      obj.push({
        data: blog,
        author: { name: author.username, id: author._id, photo: author.photo },
      });
    }
    res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
};

export const getAuthor = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogid);
    const user = await User.findById(blog.author);
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (err) {
    next(err);
  }
};

export const updateLikes = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogid,
      { $addToSet: { likes: req.params.userid } },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

export const updateDislikes = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogid,
      { $pull: { likes: req.params.userid } },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};