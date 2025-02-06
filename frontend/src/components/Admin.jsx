import axios from "axios";
import { useEffect, useState } from "react";

const Admin = () => {
  const url = "http://localhost:9000";
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  const removeUser = async (id) => {
    const conformReq = window.confirm("are you sure you want to remove user");
    if (conformReq) {
      const remove_user = await axios.delete(
        `${url}/api/v1/user/remove/${id}`,
        {
          headers: {
            token,
          },
        }
      );
      console.log(remove_user.data.user);
      setUsers(users.filter((user) => id !== user._id));
    } else {
      console.log("remove user request cancel");
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/user/all`, {
        headers: {
          token,
        },
      });
      console.log(res.data.users);
      setUsers(res.data.users);
    } catch (error) {
      console.log(
        "error while fetching users API : " + error.response.data.message
      );
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="container p-6 m-auto  flex flex-col items-center justify-center bg-orange-200 w-full rounded-lg">
      <p className="h-1 font-bold text-red-500 items-center ">
        WEL - COME ADMIN
      </p>
      {users.map((user) => {
        return (
          <div
            key={user._id}
            className="container flex flex-col gap-7 text-center m-auto font-semibold p-6 items-center "
          >
            <p>user ID : {user._id}</p>
            <p>user Name : {user.name}</p>
            <p>user Email : {user.email}</p>
            <h4>user Joined Date-Time: {user.joinDate} </h4>
            <h2>user Role : {user.role}</h2>
            <p>
              user Image <img src={`${url}/Image/${user.Image}`} />
            </p>
            <button
              className="text-red-700"
              onClick={() => {
                removeUser(user._id);
              }}
            >
              Remove user
            </button>
          </div>
        );
      }, <hr />)}
    </div>
  );
};

export default Admin;
