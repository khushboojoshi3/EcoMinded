import mongoose from "mongoose";
const ArtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    view: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Art", ArtSchema);