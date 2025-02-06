import express, { json } from "express";
import UserModel from "../models/UserModel.js";
import userModel from "../models/UserModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
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

    const isUser = await userModel.findOne({ email }).select("-password");

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

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Please Enter email and password",
      });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user not found for these Email",
      });
    const passVerify = await bcrypt.compare(password, user.password);
    if (!passVerify)
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });

    const payLoad = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    const token = JWT.sign(payLoad, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in Loign API",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, email } = req.body;
    console.log(_id, name, email);
    const Image = `${req.file.filename}`;
    console.log(Image);
    if (!_id)
      return res.status(400).json({
        success: false,
        message: "id not found on req.body",
      });

    const user = await userModel.findById(_id);
    const userImage = user.Image;

    fs.unlink("uploads/" + user.Image, async () => {
      console.log("Image Deleted succesfully");
    });

    if (name) user.name = name;
    if (email) user.email = email;
    if (Image) {
      user.Image = Image;
      console.log("image updated ");
    } else {
      user.Image = userImage;
      userImage = null;
    }

    user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in update user : " + error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findById(_id);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error in getProfile : " + error.message);
    res.json({
      success: false,
      message: "Error in get user profile " + error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in getAllUsers :  " + error.message);
    res.json({
      success: false,
      message: "Error in getAllUser API : " + error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const user = await userModel.findById(id).select("-password");
    console.log(user);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found for these ID or incorrecct ID",
      });
    if (user.Image) {
      fs.unlink(`uploads/${user.Image}`, () => {
        console.log("Image deleted succefully");
      });
    }

    await userModel.deleteOne({ email: user.email });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Error in remove User API",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { currPassword, newPassword, conformPassword } = req.body;
    if (!currPassword || !newPassword || !conformPassword) {
      return res.status(400).json({
        success: false,
        message: "please enter all field ",
      });
    }

    if (newPassword !== conformPassword) {
      return res.status(400).json({
        success: false,
        message: "new password and conformed password not matched",
      });
    }

    const user = await userModel.findById(_id);
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user not found for these id",
      });

    const checkPass = await bcrypt.compare(currPassword, user.password);

    if (!checkPass)
      return res.status(400).json({
        success: false,
        message: "incorrect current password",
      });

    const newHashedPass = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(_id, { password: newHashedPass });

    res.status(201).json({
      success: true,
      message: "Pass change ",
    });

    console.log("pass change");
  } catch (error) {
    console.log("error in change Password API" + error.message);
    return res.status(500).json({
      success: false,
      message: "Error in Change Password " + error.message,
    });
  }
};

export {
  registerUser,
  LoginUser,
  updateUser,
  getAllUser,
  getProfile,
  removeUser,
  changePassword,
};
