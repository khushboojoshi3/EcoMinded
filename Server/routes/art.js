import express from "express";
import {
  createArt,
  deleteArt,
  getArt,
  getArts,
  updateArt,
} from "../controllers/Art.js";
// import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:userid", createArt);

//UPDATE
router.put("/:id",updateArt);
//DELETE
router.delete("/:id/:userid",deleteArt);
//GET
router.get("/find/:id", getArt);
//GET ALL
router.get("/", getArts);

export default router;