import express from "express";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  getAuthor,
  updateLikes
} from "../controllers/Blog.js";
// import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:userid", createBlog);
//UPDATE
router.put("/:id", updateBlog);

//UPDATE LIKES
router.put("/likes/:blogid/:userid", updateLikes);
//DELETE
router.delete("/:id/:userid", deleteBlog);
//GET
router.get("/find/:id", getBlog);
//GET ALL
router.get("/", getBlogs);
//GET AUTHOR
router.get("/author/:blogid", getAuthor);

export default router;