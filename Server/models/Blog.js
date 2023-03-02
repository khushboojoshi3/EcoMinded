import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    likes: {
      type: [String],
    },
    views: {
      type: Number,
      default:0,
      required: true,
    },
    feature_img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);