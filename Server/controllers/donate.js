import Donate from "../models/Donate.js";
import User from "../models/User.js";
import { emissionFactor } from "../utils/emission_factor.js";
const getItems = (items) => {
    const arr = [];
    let total_co2e = 0;
    items.forEach((item) => {
        if (item.qty != null) {
            let item_co2e = item.qty * emissionFactor[item.name];
            arr.push({ name: item.name, qty: item.qty, co2e: item_co2e });
            total_co2e += item_co2e;
        }
    });
    return { items:arr,total_co2e:Math.floor(total_co2e)};
}
export const createDonation = async (req, res, next) => {
  const userId = req.params.userid;
  const { items } = getItems(req.body.items);
  const request = {
     items: items,
     status: req.body.status,
     pickupType: req.body.pickupType,
  };
  if (req.body.pickupType === "doorstep") {
    request.timeSlot = req.body.timeSlot;
    request.address = req.body.address;
    request.charges = parseInt(req.body.charges);
  }
  try {
    const newDonation = new Donate(request);
    const savedDonation = await newDonation.save();
    try {
      await User.findByIdAndUpdate(userId, {
          $push: { donations: savedDonation._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedDonation);
  } catch (err) {
    next(err);
  }
};
const getTotalCo2e = (items) => {
    let total = 0;
    items.forEach((item) => {
        total += item.co2e;
    });
    return Math.floor(total);
}
export const updateDonation = async (req, res, next) => {
  const userId = req.params.userid;  
  const status = req.body.status;
  try {
    const updatedDonation = await Donate.findByIdAndUpdate(
      req.params.id,
      { $set: {status:req.body.status} },
      { new: true }
    );
    if (status === "picked") {
        const total_co2e = getTotalCo2e(updatedDonation.items);
         try {
           await User.findByIdAndUpdate(userId, {
             $inc: { coins: total_co2e },
           });
         } catch (err) {
           next(err);
         }
    }
    res.status(200).json(updatedDonation);
  } catch (err) {
    next(err);
  }
};

export const deleteDonation = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    await Donate.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { donations: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Donation has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getDonation = async (req, res, next) => {
  try {
    const donation = await Donate.findById(req.params.id);
    res.status(200).json(donation);
  } catch (err) {
    next(err);
  }
};
export const getDonations = async (req, res, next) => {
  try {
    const donations = await Donate.find();
    res.status(200).json(donations);
  } catch (err) {
    next(err);
  }
};
