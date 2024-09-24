/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get("http://localhost:4000/api/showall");
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      {user.length === 0 ? (
        <div className="mt-4">No users available!!</div>
      ) : (
        <div>
          <h3>List of Users</h3>
          <table className="table border shadow">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Profile Photo</th>
              </tr>
            </thead>
            <tbody>
              {user.map((users, index) => (
                <tr>
                  <th scope="row"> {index + 1}</th>
                  <td>{users.username}</td>
                  <td>{users.useremail}</td>
                  <td>{users.userage}</td>
                  <td>{users.usergender}</td>
                  <td>
                    <img src={users.profileImg} height="150rem" alt="dp" />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
