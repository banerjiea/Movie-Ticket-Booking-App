import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import swal from "sweetalert";
const Login = ({ setIsSignedIn }) => {
  const [useremail, setemail] = useState("");
  const [userpw, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from context

  async function login() {
    let item = { useremail, userpw };
    try {
      let result = await axios.post("http://localhost:4000/api/login", item);

      if (result.data.useremail === useremail) {
        swal("Logged in successfully!", "", "success");
        setIsSignedIn(true);
        setUser(result.data); // Set the user data in context
        navigate("/");
      } else {
        swal(result.data.msg, "", "error");
      }
    } catch (error) {
      alert("Login failed:" + error);
    }
  }

  const redirect = () => {
    navigate("/login/signup");
  };

  return (
    <div
      className="container"
      style={{
        boxShadow: "5px 5px 5px 5px",
        paddingBottom: "5rem",
        marginTop: "5rem",
        paddingTop: "2rem",
        backgroundColor: "bisque",
      }}
    >
      <h2>Welcome back</h2>

      <div className="form-group" style={{ width: "50%", marginLeft: "18rem" }}>
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Enter Email"
          name="username"
          value={useremail}
          onChange={(e) => setemail(e.target.value)}
          required
        />
      </div>
      <div className="form-group" style={{ width: "50%", marginLeft: "18rem" }}>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter Password"
          name="userpw"
          value={userpw}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="btn btn-warning  btn-block"
        style={{ width: "25%" }}
        onClick={login}
      >
        Login
      </button>
      <h3>OR</h3>
      <button className="btn btn-warning" onClick={redirect}>
        Create New Account
      </button>
    </div>
  );
};

export default Login;
