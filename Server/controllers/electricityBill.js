import User from "../models/User.js";
import ElectricityBill from "../models/ElectricityBill.js";

export const createElectricityBill = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    const response = await fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emission_factor: {
          activity_id: "electricity-energy_source_grid_mix",
          source: "ADEME",
          region: "IN",
          year: "2021",
          lca_activity: "electricity_generation",
        },
        parameters: {
          energy: parseInt(req.body.units),
          energy_unit: "kWh",
        },
      }),
    });
    const responseCo2 = await response.json();
    const request = { ...req.body, co2e: responseCo2.co2e };
    const newElectricityBill = new ElectricityBill(request);
    const savedElectricityBill = await newElectricityBill.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { electricityBills: savedElectricityBill._id },
        $inc: { coins: 10 },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedElectricityBill);
  } catch (err) {
    next(err);
  }
};

export const updateElectricityBill = async (req, res, next) => {
  try {
    const updatedElectricityBill = await ElectricityBill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedElectricityBill);
  } catch (err) {
    next(err);
  }
};

export const deleteElectricityBill = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    await ElectricityBill.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { electricityBills: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Electricity Bill has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getElectricityBill = async (req, res, next) => {
  try {
    const electricityBill = await ElectricityBill.findById(req.params.id);
    res.status(200).json(electricityBill);
  } catch (err) {
    next(err);
  }
};
export const getElectricityBills = async (req, res, next) => {
  try {
    const electricityBills = await ElectricityBill.find();
    res.status(200).json(electricityBills);
  } catch (err) {
    next(err);
  }
};
