import express from "express";
import { createDonation, deleteDonation, getDonation, getDonations, updateDonation } from "../controllers/donate.js";
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//CREATE
router.post('/:userid', verifyUser,createDonation);
//UPDATE
router.put("/:id/:userid", verifyUser, updateDonation);

//DELETE
router.delete("/:id/:userid", verifyUser, deleteDonation);

//GET
router.get("/:id", verifyUser,getDonation);

//GET ALL
router.get("/", verifyAdmin,getDonations);

export default router;