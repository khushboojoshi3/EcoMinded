import User from "../models/User.js";
import Leaderboard from "../models/Leaderboard.js";
export const createUpdatePlayer = async (req, res, next) => {
  const playerid = req.body.playerid;
  try {
    const player = await Leaderboard.findOne({ playerid: playerid });
    let savedPlayer = undefined;
    if (player) {
      savedPlayer = await Leaderboard.findByIdAndUpdate(
        player._id,
        { $set: { score: req.body.score } },
        { new: true }
      );
      res.status(200).json(savedPlayer);
    } else {
      const newPlayer = new Leaderboard(req.body);
      savedPlayer = await newPlayer.save();
      res.status(200).json(savedPlayer);
    }
  } catch (err) {
    next(err);
  }
};

export const getPlayers = async (req, res, next) => {
  try {
    const players = await Leaderboard.find();
    const obj = [];
    for (let i = 0; i < players.length; i++) {
      const playerInfo = players[i];
      const user = await User.findById(playerInfo.playerid);
      obj.push({
        data: playerInfo,
        player: {
          name: user.username,
          id: user._id,
          photo: user.photo,
        },
      });
    }
    let sortedPlayers = obj.sort((p1, p2) =>
      p1.data.score < p2.data.score ? 1 : p1.data.score > p2.data.score ? -1 : 0
    );
    res.status(200).json(sortedPlayers);
  } catch (err) {
    next(err);
  }
};
