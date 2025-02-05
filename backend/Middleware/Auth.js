import JWT from "jsonwebtoken";
import userModel from "../models/UserModel.js";
const isAuth = async (req, res, next) => {
  try {
    const token = `${req.headers.token}`;
    if (!token)
      res.status(400).json({
        success: false,
        message: "Token not Found",
      });
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    if (decode) {
      req.user = decode;
    }
    next();
  } catch (error) {
    console.log("Error in isAuth API : " + error.message);
    res.status(400).json({
      success: false,
      message: `Error in isAuth API  : ${error.message}`,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findById(_id);
    if (user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You are not admin",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "Error in isAdmin API",
    });
  }
};

export { isAuth, isAdmin };
