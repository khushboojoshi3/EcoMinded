import express from "express";

import {
  createReward,
  deleteReward,
  getReward,
  getRewards,
  updateReward,
} from "../controllers/Reward.js";

import Reward from "../models/Reward.js";
import { createError } from "../utils/error.js";
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
// router.post("/", verifyAdmin, createReward);

// //UPDATE
// router.put("/:id",verifyAdmin, updateReward);
// //DELETE
// router.delete("/:id", verifyAdmin, deleteReward);
// //GET
// router.get("/find/:id", verifyUser, getReward);
// //GET ALL
// router.get("/", verifyUser, getRewards);


router.post("/", createReward);

//UPDATE
router.put("/:id", updateReward);
//DELETE
router.delete("/:id", deleteReward);
//GET
router.get("/find/:id", getReward);
//GET ALL
router.get("/", getRewards);
// router.get("/countByCity", countByCity);
// router.get("/countByGenre", countByGenre);
// router.get("/theater/:id", getMovieTheater);

// router.put("/redeem/userid/:id", updateUserReward);
export default router;