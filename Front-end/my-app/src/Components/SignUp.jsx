import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    userpw: "",
    useremail: "",
    userage: null,
    usergender: "",
  });

  const [profileImg, setProfileImg] = useState("");
  const { username, userpw, useremail, userage, usergender } = user;

  const navigate = useNavigate();

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("username", username);
    formData.append("userpw", userpw);
    formData.append("useremail", useremail);
    formData.append("userage", userage);
    formData.append("usergender", usergender);
    axios
      .post("http://localhost:4000/api/userupload", formData, {})
      .then((res) => {
        if (res.data.message === "Email is already registered") {
          swal(res.data.message, "", "warning");
          navigate("/login/signup");
        } else {
          swal(res.data.message, "", "success");
          navigate("/login");
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container mt-3">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Name"
            name="username"
            value={username}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Enter Password"
            name="userpw"
            value={userpw}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter Email"
            name="useremail"
            value={useremail}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Enter Age"
            name="userage"
            value={userage}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control form-control-lg"
            name="usergender"
            value={usergender}
            onChange={(e) => onInputChange(e)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          Profile Picture:
          <input
            className="ml-3"
            type="file"
            onChange={onFileChange}
            name="profileImg"
            required
          />
        </div>
        <button className="btn btn-primary btn-block">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
