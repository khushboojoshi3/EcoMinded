import express from "express";
import { createUpdatePlayer, getPlayers } from "../controllers/leaderboard.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE PLAYER
router.post("/:userid", verifyUser, createUpdatePlayer);

//UPDATE SCORE
// router.put("/score/:userid", verifyUser, updateScore);

router.get("/", verifyUser, getPlayers);
export default router;
