import Art from "../models/Art.js";
import User from "../models/User.js";

export const createArt = async (req, res, next) => {
    const newArt = new Art(req.body);
    const userId = req.params.userid;
    try {
      const savedArt = await newArt.save();
       try {
         await User.findByIdAndUpdate(userId, {
           $push: { art: savedArt._id },
         });
       } catch (err) {
         next(err);
       }
      res.status(200).json(savedArt);
    } catch (err) {
      next(err);
    }
};

export const updateArt = async (req, res, next) => {
  try {
    const updatedArt = await Art.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedArt);
  } catch (err) {
    next(err);
  }
};

export const deleteArt = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    await Art.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { art: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Art has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getArt = async (req, res, next) => {
  try {
    const art = await Art.findById(req.params.id);
    res.status(200).json(art);
  } catch (err) {
    next(err);
  }
};

export const getArts = async (req,res,next)=>{
    try {
      const arts = await Art.find();
      res.status(200).json(arts);
    } catch (err) {
      next(err);
    }
  };

// export const updateLikes = async (req, res, next) => {
//   try {
//       const updatedArt = await Art.findByIdAndUpdate(
//         req.params.id,
//         { $inc: 1 },
//         { new: true }
//       );
//       res.status(200).json(updatedArt);
//   } catch(err) {
//     next(err);
//    }
//  } 