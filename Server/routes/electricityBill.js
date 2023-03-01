import express from "express";
import { createElectricityBill, deleteElectricityBill, getElectricityBill, getElectricityBills, updateElectricityBill } from "../controllers/electricityBill.js";
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:userid", verifyUser, createElectricityBill);
// router.post("/:userid", createElectricityBill);
//UPDATE
router.put("/:id", verifyUser, updateElectricityBill);

//DELETE
router.delete("/:id/:userid", verifyUser, deleteElectricityBill);

//GET
router.get("/:id",verifyUser,getElectricityBill);

//GET ALL
router.get("/",verifyAdmin,getElectricityBills);

export default router;
