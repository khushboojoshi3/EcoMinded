import mongoose from "mongoose";
const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  promocode: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Reward", RewardSchema);
