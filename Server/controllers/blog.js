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
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

export const getBlogs = async (req,res,next)=>{
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
};