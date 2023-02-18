import Donate from "../models/Donate.js";
import ElectricityBill from "../models/ElectricityBill.js";
import User from "../models/User.js";
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