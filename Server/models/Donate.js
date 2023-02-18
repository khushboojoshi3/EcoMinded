import mongoose from "mongoose";
const DonateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  items: {
    type: [{name:String,qty:Number,co2e:Number}],
    required: true,
  },
  status: {
    type: String,
    default:"requested"
  },
  address: {
    type: {addressLine1:String,addressLine2:String,city:String,state:String,pincode:String},
    required: true,
   },
   pickupType:{
    type: String,
    required:true
   },
   charges: {
    type: Number,
    required:true
   }
});

export default mongoose.model("Donate", DonateSchema);
