import express from "express";
import {
  createArt,
  deleteArt,
  getArt,
  getArts,
  updateArt,
} from "../controllers/Art.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:userid", verifyUser, createArt);

//UPDATE
router.put("/:id",verifyUser, updateArt);
//DELETE
router.delete("/:id/:userid", verifyUser, deleteArt);
//GET
router.get("/find/:id",verifyUser, getArt);
//GET ALL
router.get("/", verifyUser, getArts);

export default router;