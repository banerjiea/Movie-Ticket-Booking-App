import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../AdminContext";
import swal from "sweetalert";

const Admin = ({ setIsAdmin }) => {
  const [adminemail, setemail] = useState("");
  const [adminpw, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAdmin } = useAdmin(); // Access setUser from context

  async function login() {
    let item = { adminemail, adminpw };
    try {
      let result = await axios.post(
        "http://localhost:4000/adminapi/login",
        item
      );

      if (result.data.adminemail === adminemail) {
        swal("Logged in successfully!", "", "success");
        setIsAdmin(true);
        setAdmin(result.data); // Set the user data in context
        navigate("/");
      } else {
        swal(result.data.msg, "", "error");
      }
    } catch (error) {
      alert("Login failed:" + error);
    }
  }

  return (
    <div className="container">
      <h2>Admin Login</h2>

      <div className="form-group" style={{ width: "50%", marginLeft: "16rem" }}>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Email"
          name="adminname"
          value={adminemail}
          onChange={(e) => setemail(e.target.value)}
          required
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: "16rem" }}>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter Password"
          name="adminpw"
          value={adminpw}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="btn btn-outline-primary  btn-block"
        style={{ width: "25%" }}
        onClick={login}
      >
        Login
      </button>
    </div>
  );
};

export default Admin;
