import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getMyDonations,
  getMyBills,
  updateClaimedReward,
  getMyArt,
  getMyBlogs,
  getMyClaimedRewards,
  getAllRewards,
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello admin, you are logged in and you can delete all accounts");
});

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);
//GET BILLS
router.get("/electricityBills/:id",verifyUser,getMyBills);
//GET DONATIONS
router.get("/donations/:id", verifyUser, getMyDonations);
//GET ART
router.get("/art/:id", verifyUser, getMyArt);
//GET BLOGS
router.get("/blogs/:id", verifyUser, getMyBlogs);
//GET CLAIMED REWARDS
router.get("/claimedRewards/:id", verifyUser, getMyClaimedRewards);
//UPDATE CLAIMED REWARDS
router.put("/claimedRewards/:id/:rewardid", verifyUser, updateClaimedReward);
//GET ALL REWARDS
router.get("/allRewards/:id", verifyUser, getAllRewards);
export default router;
