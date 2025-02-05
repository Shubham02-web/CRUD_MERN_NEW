import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Link to="/">Register</Link>
      <Link to="/update">Update User</Link>
      <Link to="/profile">userProfile</Link>
      {/* <Link to="/remove/:id">Remove User</Link> */}
      <Link to="/admin">Admin</Link>
    </div>
  );
};

export default Navbar;
