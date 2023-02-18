import express from "express";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/Blog.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:userid", verifyUser, createBlog);
//UPDATE
router.put("/:id",verifyUser, updateBlog);
//DELETE
router.delete("/:id/:userid", verifyUser, deleteBlog);
//GET
router.get("/find/:id", verifyUser, getBlog);
//GET ALL
router.get("/", verifyUser, getBlogs);

export default router;