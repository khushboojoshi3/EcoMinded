import mongoose from "mongoose";
const ElectricityBillSchema = new mongoose.Schema(
  {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    units: {
      type:Number,
      required:true,   
    },
    co2e:{
      type: Number,
      required:true,
    }
  }
);

export default mongoose.model("ElectricityBill", ElectricityBillSchema);
