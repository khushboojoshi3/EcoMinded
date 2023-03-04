import mongoose from "mongoose";
const LeaderboardSchema = new mongoose.Schema({
  playerid: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Leaderboard", LeaderboardSchema);
