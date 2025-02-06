import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const url = "http://localhost:9000";
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const user = await axios.get(`${url}/api/v1/user/profile`, {
        headers: {
          token,
        },
      });
      setUser(user.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(user);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="container flex flex-col bg-blue-100 w-7/12 m-auto p-10 mt-3 font-sans font-semibold gap-6 items-center rounded-3xl">
      <h1>ID : {user._id}</h1>
      <h2>Name : {user.name}</h2>
      <h2>Email : {user.email}</h2>
      <h3>Join Date : {user.joinDate}</h3>
      <h3>Role : {user.role}</h3>
      <h3>
        Profile Pic :
        <img
          width={60}
          height={60}
          src={`${url}/Image/${user.Image}`}
          alt="Profile Image"
        />
      </h3>
    </div>
  );
};

export default Profile;
