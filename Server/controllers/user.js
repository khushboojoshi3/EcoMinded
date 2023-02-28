import Donate from "../models/Donate.js";
import ElectricityBill from "../models/ElectricityBill.js";
import User from "../models/User.js";
import Reward from "../models/Reward.js";
import Art from "../models/Art.js";
import Blog from "../models/Blog.js";
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getMyBills = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.electricityBills.map((electricityBill) => {
        return ElectricityBill.findById(electricityBill);
      })
    );
    list.sort(function (a, b) {
      return new Date(a.from) - new Date(b.from);
    });
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const getMyDonations = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.donations.map((donation) => {
        return Donate.findById(donation);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const getMyArt = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.art.map((art_id) => {
        return Art.findById(art_id);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const getMyBlogs = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.blogs.map((blog) => {
        return Blog.findById(blog);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const getMyClaimedRewards = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.claimedRewards.map((claimedReward) => {
        return Reward.findById(claimedReward);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const updateClaimedReward = async (req, res, next) => {
  try {
    const reward = await Reward.findById(req.params.rewardid);
    const updatedUser=await User.findByIdAndUpdate(req.params.id, {
      $push: { claimedRewards: reward._id },
      $inc: { coins: (-1*reward.coins) },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const getAllRewards = async (req, res, next) => {
  try {
    const rewards = await Reward.find();
    const user = await User.findById(req.params.id);
    const list = rewards.filter((reward) => user.claimedRewards.includes(reward._id, 0) === false);
    res.status(200).json(list);
  } catch (err) {
    next(err)
  }
}
