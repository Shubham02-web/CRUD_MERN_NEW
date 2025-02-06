import { useState } from "react";
import axios from "axios";
import "../index.css";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Image, setImage] = useState(null);
  const [signup, setSignup] = useState(false);

  const HandleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async (e) => {
    if (signup) {
      try {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        formData.append("Image", Image);
        const res = await axios.post(
          "http://localhost:9000/api/v1/user/register",
          formData
        );
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        alert("Error : " + error.response.data.message);
      }
    } else {
      try {
        e.preventDefault();
        const res = await axios.post(
          "http://localhost:9000/api/v1/user/login",
          data
        );
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        alert("Error : " + error.response.data.message);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="container flex flex-col   p-20 items-center  justify-center w-3/6 bg-pink-200 mt-5 content-center ml-96 rounded-3xl"
    >
      <div className="flex items-center justify-center text-center gap-8 flex-col ">
        {signup && (
          <div className="flex items-center justify-center text-center gap-8 flex-col ">
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={HandleChange}
            />
            <input
              type="file"
              name="Image"
              placeholder="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={HandleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={HandleChange}
        />
        <button type="submit">Submit</button>

        {signup ? (
          <p onClick={() => setSignup(false)}>All ready user Login here</p>
        ) : (
          <p onClick={() => setSignup(true)}>New user Register here</p>
        )}
      </div>
    </form>
  );
};

export default Register;
