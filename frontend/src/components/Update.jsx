import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";

const Update = () => {
  const [data, setData] = useState({ name: "", email: "" });
  const [passData, setPassData] = useState({
    currPassword: "",
    newPassword: "",
    conformPassword: "",
  });
  const [Image, setImage] = useState(null);
  const [pass, setPass] = useState(false);
  const url = "http://localhost:9000";
  const token = localStorage.getItem("token");

  // Fetch user profile on mount
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await axios.get(`${url}/api/v1/user/profile`, {
          headers: { token },
        });
        setData(userProfile.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    getUserProfile();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangePass = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (pass) {
      try {
        const res = await axios.put(`${url}/api/v1/user/passchange`, passData, {
          headers: { token },
        });
        console.log(res.data.message);
        setPassData({ currPassword: "", newPassword: "", conformPassword: "" });
      } catch (error) {
        console.error("Error changing password:", error.response.data.message);
      }
    } else {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      if (Image) {
        formData.append("Image", Image);
      }
      try {
        const res = await axios.put(`${url}/api/v1/user/update`, formData, {
          headers: { token },
        });
        setData(res.data.user);
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="container bg-red-200 flex flex-col items-center justify-center text-center gap-4 p-10 w-5/12 h-fit rounded-3xl mt-5 ml-96 "
    >
      {pass ? (
        <div className="flex flex-col gap-6 ">
          <input
            type="hidden"
            name="email"
            value={data.email}
            autoComplete="username"
          />

          <input
            type="password"
            name="currPassword"
            placeholder="Current password"
            value={passData.currPassword}
            onChange={handleChangePass}
            autoComplete="current-password"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={passData.newPassword}
            onChange={handleChangePass}
            autoComplete="new-password"
          />

          <input
            type="password"
            name="conformPassword"
            placeholder="Confirm password"
            value={passData.conformPassword}
            onChange={handleChangePass}
            autoComplete="new-password"
          />

          <p onClick={() => setPass(false)}>
            Want to change user details? Click here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 ">
          <h1>Update User Details</h1>

          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <div>
            <input
              type="file"
              name="Image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {data.Image && (
              <img
                width={60}
                height={60}
                src={`${url}/Image/${data.Image}`}
                alt="Profile"
              />
            )}
          </div>

          <p onClick={() => setPass(true)}>
            Want to change password? Click here
          </p>
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Update;
