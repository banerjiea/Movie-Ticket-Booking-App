import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreateAdmin = () => {
  const [admin, setAdmin] = useState({
    adminname: "",
    adminpw: "",
    adminemail: "",
  });

  const [profileImg, setProfileImg] = useState("");
  const { adminname, adminpw, adminemail } = admin;

  const navigate = useNavigate();

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("adminname", adminname);
    formData.append("adminpw", adminpw);
    formData.append("adminemail", adminemail);
    axios
      .post("http://localhost:4000/adminapi/adminupload", formData, {})
      .then((res) => {
        if (res.data.message === "Email is already registered") {
          alert(res.data.message);
          navigate("/login/signup");
        } else {
          alert(res.data.message);
          navigate("/login");
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Name"
            name="adminname"
            value={adminname}
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Enter Age"
            name="adminpw"
            value={adminpw}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter Email"
            name="adminemail"
            value={adminemail}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="form-group">
          Profile Picture:
          <input
            className="ml-3"
            type="file"
            onChange={onFileChange}
            name="profileImg"
          />
        </div>
        <button className="btn btn-primary btn-block">Add Employee</button>
      </form>
    </div>
  );
};

export default CreateAdmin;
