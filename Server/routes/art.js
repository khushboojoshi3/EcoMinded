import express from "express";
import {
  createArt,
  deleteArt,
  getArt,
  getArts,
  updateArt,
  updateDislikes,
  updateLikes,
  updateViews
} from "../controllers/Art.js";
import {verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:userid", verifyUser, createArt);

//UPDATE
router.put("/:id", verifyUser, updateArt);
//UPDATE VIEWS
router.put("/views/:artid/",verifyUser, updateViews);
//UPDATE LIKES
router.put("/likes/:artid/:userid",verifyUser, updateLikes);
//UPDATE DISLIKES
router.put("/dislikes/:artid/:userid",verifyUser, updateDislikes);
//DELETE
router.delete("/:id/:userid", verifyUser, deleteArt);
//GET
router.get("/find/:id", verifyUser, getArt);
//GET ALL
router.get("/", verifyUser, getArts);

// //GET AUTHOR
// router.get("/artist/:blogid",verifyUser, getAuthor);

//UPDATE LIKES
// router.put("/likes/:blogid/:userid",verifyUser, updateLikes);

export default router;