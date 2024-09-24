/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditUser = ({ setIsSignedIn }) => {
  let navigate = useNavigate();
  const { _id } = useParams();
  const [user, setUser] = useState({
    username: "",
    userage: "",
    usergender: "",
  });
  const { username, userage, usergender } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:4000/api/update/${_id}`, user);
      setIsSignedIn(true);
      navigate("/");
      swal("Updated Successfully", "", "success");
    } catch (err) {
      console.log(err);
    }
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/api/allinfo/${_id}`);
    setUser(result.data);
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Edit Details</h2>
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

        <button className="btn btn-primary btn-block">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
