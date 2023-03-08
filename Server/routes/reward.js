import express from "express";

import {
  createReward,
  deleteReward,
  getReward,
  getRewards,
  updateReward,
} from "../controllers/reward.js";
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createReward);

//UPDATE
router.put("/:id",verifyAdmin, updateReward);
//DELETE
router.delete("/:id", verifyAdmin, deleteReward);
//GET
router.get("/find/:id", verifyUser, getReward);
//GET ALL
router.get("/:userid", verifyUser, getRewards);

// router.put("/redeem/userid/:id", updateUserReward);
export default router;