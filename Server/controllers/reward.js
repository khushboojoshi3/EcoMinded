import Reward from "../models/Reward.js";
// import User from "../models/User.js";
export const createReward = async (req, res, next) => {
    const newReward = new Reward(req.body);
  
    try {
      const savedReward = await newReward.save();
      res.status(200).json(savedReward);
    } catch (err) {
      next(err);
    }
};

export const updateReward = async (req, res, next) => {
  try {
    const updatedReward = await Reward.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReward);
  } catch (err) {
    next(err);
  }
};
// export const updateUserReward = async (req, res, next) => {
//   const reward = await Reward.findById(req.params.id);
//   const user = await User.findById(req.params.userid);
//   try {
//     const updatedReward = await Reward.findByIdAndUpdate(
//       req.params.id,
//       { $set: {isClaimed: true} },
//       { new: true }
//     );
//     try{
//       await User.findByIdAndUpdate(userid, {
//         $dec: { coins: reward.coins },
//     });
    
//     }
//     catch (err) {
//     next(err);
//   }
//     res.status(200).json(updatedReward);
//   } catch (err) {
//     next(err);
//   }
// };

export const deleteReward = async (req, res, next) => {
  try {
    await Reward.findByIdAndDelete(req.params.id);
    res.status(200).json("Reward has been deleted.");
  } catch (err) {
    next(err);
  }
};

//how to get only unclaimed rewards
export const getReward = async (req, res, next) => {
  try {
    const reward = await Reward.findById(req.params.id);
    res.status(200).json(reward);
  } catch (err) {
    next(err);
  }
};

export const getRewards = async (req,res,next)=>{
    try {
      const rewards = await Reward.find();
      res.status(200).json(rewards);
    } catch (err) {
      next(err);
    }
};

