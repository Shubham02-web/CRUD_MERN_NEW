import axios from "axios";
import React, { useState } from "react";

const Update = () => {
  const [data, setData] = useState({});
  const [Image, setImage] = useState(null);

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const onSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      if (Image) formData.append("Image", Image);
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.put("http:localhost:9000/api/v1/user/update", {
        Headers: {
          token,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  onSubmit();
  return (
    <form onSubmit={onSubmit}>
      <h1>Update User Details</h1>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="name"
      />
    </form>
  );
};

export default Update;
