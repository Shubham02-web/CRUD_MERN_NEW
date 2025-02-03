import express, { json } from "express";
import UserModel from "../models/UserModel.js";
import userModel from "../models/UserModel.js";
import JWT from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return (
        res.status(400),
        json({
          success: false,
          message: "please Enter All Fields name , email,  password",
        })
      );

    const Image = `${req.file.filename}`;
    if (!Image)
      return res.status(400).json({
        success: false,
        message: "Please Upload Image",
      });

    const isUser = await userModel.findOne({ email });

    if (isUser)
      return res.status(400).json({
        success: false,
        message: "Email Allready Registerd",
      });

    const user = await userModel.create({
      name,
      email,
      password,
      Image,
    });

    await user.save();

    const payLoad = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    const token = await JWT.sign(payLoad, process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      token,
      message: `User : ${user}`,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: `Error in user registration ${error.message}`,
    });
  }
};

export { registerUser };
