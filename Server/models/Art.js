import mongoose from "mongoose";
const ArtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Art", ArtSchema);