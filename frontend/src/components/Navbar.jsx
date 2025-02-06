import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
const Navbar = () => {
  return (
    <div className="container flex  bg-green-200 items-center ">
      <div className=" justify-start w-72 md:w-32 sm:w-14 ">
        <img src="./logo.png" alt="Logo" />
      </div>
      <div className=" flex justify-end space-x-3 pr-10 flex-auto   lg:gap-14 md:gap-1 ">
        <Link to="/">Register</Link>
        <Link to="/update">Update User</Link>
        <Link to="/profile">userProfile</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
};

export default Navbar;
