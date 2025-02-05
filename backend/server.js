import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./Middleware/DB.js";
import userRoute from "./Routes/userRoute.js";
import cors from "cors";
dotenv.config();
ConnectDB();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("App created in server file");
});

app.use("/Image", express.static("uploads"));
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`server running on PORT no ${PORT}`);
});
