import express from "express";

import {
  createArt,
  deleteArt,
  getArt,
  getArts,
  updateArt,
} from "../controllers/Art.js";

import Art from "../models/Art.js";
import { createError } from "../utils/error.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

// //CREATE
// router.post("/", verifyUser, createArt);

// //UPDATE
// router.put("/:id",verifyUser, updateArt);
// //DELETE
// router.delete("/:id", verifyUser, deleteArt);
// //GET
// router.get("/find/:id",verifyUser, getArt);
// //GET ALL
// router.get("/", verifyUser, getArts);

//CREATE
router.post("/", createArt);

//UPDATE
router.put("/:id", updateArt);
//DELETE
router.delete("/:id", deleteArt);
//GET
router.get("/find/:id", getArt);
//GET ALL
router.get("/", getArts);
// router.get("/countByCity", countByCity);
// router.get("/countByGenre", countByGenre);
// router.get("/theater/:id", getMovieTheater);

export default router;