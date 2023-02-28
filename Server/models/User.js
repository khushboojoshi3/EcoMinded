import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
    fname: {
      type: String,
      required:true
    },
    lname: {
      type: String,
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
      default: 50,
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
    donations: {
      type: [String],
    },
    claimedRewards: {
      type:[String],
    },
    isAdmin:{
      type: Boolean,
      deafult:false,  
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
