import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

//app config

const app = express();
const port = process.env.PORT || 3000;

connectDB();
connectCloudinary();

//middlewares

app.use(express.json());
app.use(cors());

//API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
