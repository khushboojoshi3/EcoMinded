import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
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
    },
    content: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);