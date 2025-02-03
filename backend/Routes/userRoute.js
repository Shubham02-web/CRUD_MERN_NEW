import express from "express";
import upload from "../Middleware/uploadMiddleware.js";
import { registerUser } from "../Controllers/userController.js";
const userRoute = express.Router();

userRoute.post("/register", upload.single("Image"), registerUser);

export default userRoute;
