import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      default: 0,
    },
    zone: {
        type: String,
        default:"yellow"
    },
    art: {
      type: [String],
    },
    blogs: {
      type: [String],
    },
    electricityBills: {
      type: [String],
    },
    myRewards: {
      type: [String],
    },
    donations: {
      type: [String],
    },
    isAdmin:{
      type: Boolean,
      deafult:false,  
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
