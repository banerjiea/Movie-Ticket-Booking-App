/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import swal from "sweetalert";

const UserProfile = ({ setIsSignedIn }) => {
  const { _id } = useParams();
  const { user } = useUser(); // Access the user data from context
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
  });
  useEffect(() => {
    loadUser();
  }, [user]);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/api/allinfo/${_id}`);
    setUserData(result.data);
    //console.log(result.data);
  };

  const deleteUser = async (_id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to access this account",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:4000/api/delete/${_id}`);
          setIsSignedIn(false);
          navigate("/");
          swal("Your account has been deleted!", {
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          swal("Oops! Something went wrong.", {
            icon: "error",
          });
        }
      } else {
        swal("Your account is safe!");
      }
    });
  };

  return (
    <div className="mt-3">
      <div style={{ position: "absolute", marginLeft: "10rem" }}>
        <img src={user.profileImg} alt="dp" height="300rem" />
      </div>
      <div
        style={{
          position: "relative",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>Name : {userData.username}</h3>
        <h3>Email Id : {userData.useremail}</h3>
        <h3>Age : {userData.userage}</h3>
        <h3>Gender : {userData.usergender}</h3>
      </div>

      <button
        className="btn btn-outline-danger mr-2"
        onClick={() => deleteUser(user._id)}
      >
        Delete My Account
      </button>
      <Link
        className="btn btn-outline-success mr-2 ml-2"
        to={`/${user._id}/edit/${user._id}`}
      >
        Edit
      </Link>
    </div>
  );
};

export default UserProfile;
