import express from "express";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/Blog.js";

import Blog from "../models/Blog.js";
import { createError } from "../utils/error.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
// router.post("/", verifyUser, createBlog);

// //UPDATE
// router.put("/:id",verifyUser, updateBlog);
// //DELETE
// router.delete("/:id", verifyUser, deleteBlog);
// //GET
// router.get("/find/:id", verifyUser, getBlog);
// //GET ALL
// router.get("/", verifyUser, getBlogs);

router.post("/", createBlog);

//UPDATE
router.put("/:id",updateBlog);
//DELETE
router.delete("/:id", deleteBlog);
//GET
router.get("/find/:id", getBlog);
//GET ALL
router.get("/", getBlogs);
// router.get("/countByCity", countByCity);
// router.get("/countByGenre", countByGenre);
// router.get("/theater/:id", getMovieTheater);

export default router;