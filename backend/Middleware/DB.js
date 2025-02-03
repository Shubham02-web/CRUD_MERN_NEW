import mongoose from "mongoose";
const ConnectDB = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Data Base Connected Succeffully");
    })
    .catch(() => {
      console.log("Error while connecting with data base");
    });
};

export default ConnectDB;
