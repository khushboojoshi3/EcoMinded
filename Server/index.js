import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import donateRoute from "./routes/donate.js";
import electricityBillRoute from "./routes/electricityBill.js";
import artRoute from "./routes/art.js";
import blogRoute from "./routes/blog.js";
import rewardRoute from "./routes/reward.js";
import cors from "cors";
const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/electricityBill", electricityBillRoute);
app.use("/api/donate", donateRoute);
app.use("/api/art", artRoute);
app.use("/api/blog", blogRoute);
app.use("/api/reward", rewardRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8080, () => {
  connect();
  console.log("Connected to backend.");
});

