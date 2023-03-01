import express from "express";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  getAuthor,
  updateLikes,
  updateDislikes
} from "../controllers/Blog.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:userid",verifyUser, createBlog);
//UPDATE
router.put("/:id", verifyUser,updateBlog);

//UPDATE LIKES
router.put("/likes/:blogid/:userid",verifyUser, updateLikes);
//UPDATE DISLIKES
router.put("/dislikes/:blogid/:userid",verifyUser, updateDislikes);
//DELETE
router.delete("/:id/:userid", verifyUser, deleteBlog);
//GET
router.get("/find/:id",verifyUser, getBlog);
//GET ALL
router.get("/", verifyUser, getBlogs);
//GET AUTHOR
router.get("/author/:blogid",verifyUser, getAuthor);

export default router;