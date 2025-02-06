import express from "express";
import upload from "../Middleware/uploadMiddleware.js";
import {
  changePassword,
  getAllUser,
  getProfile,
  LoginUser,
  registerUser,
  removeUser,
  updateUser,
} from "../Controllers/userController.js";
import { isAdmin, isAuth } from "../Middleware/Auth.js";
const userRoute = express.Router();

userRoute.post("/register", upload.single("Image"), registerUser);
userRoute.post("/login", LoginUser);
userRoute.put("/update", isAuth, upload.single("Image"), updateUser);
userRoute.get("/all", isAuth, isAdmin, getAllUser);
userRoute.get("/profile", isAuth, getProfile);
userRoute.delete("/remove/:id", isAuth, isAdmin, removeUser);
userRoute.put("/passchange", isAuth, changePassword);
export default userRoute;
