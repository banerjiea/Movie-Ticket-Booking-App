import React, { useState } from "react";
import "./App.css";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import Protected from "./Components/Protected";
import Show from "./Components/Show";
import UserProfile from "./Components/UserProfile";
import EditUser from "./Components/EditUser";
import { useUser } from "./UserContext";
import { useAdmin } from "./AdminContext";
import Bookings from "./Components/Bookings";
import Admin from "./Components/Admin";
import UserList from "./Components/UserList";
import ProtectedAdmin from "./Components/ProtectedAdmin";
import BookingList from "./Components/BookingList";
import ShowCrud from "./Components/ShowCrud";
import AddShow from "./Components/AddShow";
import SignUp from "./Components/SignUp";
import img from "./Components/photos/bys.jpg";
import swal from "sweetalert";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditShow from "./Components/EditShow";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const { admin } = useAdmin();
  //console.log(user);

  const adminSignIn = () => {
    navigate("/admin");
  };

  const adminSignOut = () => {
    setIsAdmin(false);
    swal("Signed out Successfully!", "", "success");
  };

  const signin = () => {
    navigate("/login");
  };

  const signout = () => {
    setIsSignedIn(false);
    swal("Signed out Successfully!", "", "success");
  };

  const redirect = () => {
    navigate("/");
  };
  return (
    <div className="App">
      <div
        className="d-flex p-2 justify-content-center"
        style={{
          backgroundColor: "beige",
          boxShadow: "0px 0px 2px 2px",
        }}
      >
        <img
          src={img}
          width="60rem"
          height="100%"
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={redirect}
        />
        <h4
          style={{
            marginRight: "50rem",
            fontFamily: "cursive",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={redirect}
        >
          book
          <span style={{ color: "red" }}>your</span>
          show
        </h4>
        {isSignedIn && user ? (
          <NavLink
            to={`/${user._id}`}
            state={user}
            style={{
              fontFamily: "cursive",
              textDecoration: "none",
              marginRight: "10px",
              marginTop: "20px",
            }}
          >
            {" "}
            Profile
          </NavLink>
        ) : null}
        {isSignedIn && user ? (
          <NavLink
            to={`/booking`}
            state={user}
            style={{
              fontFamily: "cursive",
              textDecoration: "none",
              marginRight: "10px",
              marginTop: "20px",
            }}
          >
            {" "}
            Booking
          </NavLink>
        ) : null}
        {!isSignedIn && isAdmin ? (
          <NavLink
            to={`/userlist`}
            state={admin}
            style={{
              textDecoration: "none",
              marginTop: "20px",
              marginRight: "10px",
              fontFamily: "cursive",
            }}
          >
            {" "}
            Users
          </NavLink>
        ) : null}
        {!isSignedIn && isAdmin ? (
          <NavLink
            to={`/bookinglist`}
            state={admin}
            style={{
              textDecoration: "none",
              marginTop: "20px",
              marginRight: "10px",
              fontFamily: "cursive",
            }}
          >
            {" "}
            Bookings
          </NavLink>
        ) : null}
        {!isSignedIn && isAdmin ? (
          <NavLink
            to={`/showlist`}
            state={admin}
            style={{
              textDecoration: "none",
              marginTop: "20px",
              marginRight: "10px",
              fontFamily: "cursive",
            }}
          >
            {" "}
            Shows
          </NavLink>
        ) : null}
        {isSignedIn ? (
          <div className="d-grid mt-3">
            <button
              className="btn btn-danger bi bi-box-arrow-right"
              onClick={signout}
              style={{ fontFamily: "monospace" }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="d-grid mt-3 mr-3">
            <button
              className="btn btn-primary"
              onClick={signin}
              style={{ backgroundColor: "darkcyan" }}
            >
              Sign in
            </button>
          </div>
        )}

        {!isSignedIn && !isAdmin ? (
          <div className="d-grid mt-3">
            <button
              className="btn btn-primary bi bi-person-circle"
              onClick={adminSignIn}
              style={{ backgroundColor: "darkcyan" }}
            >
              Admin
            </button>
          </div>
        ) : null}
        {!isSignedIn && isAdmin ? (
          <div className="d-grid mt-3">
            <button className="btn btn-danger" onClick={adminSignOut}>
              Admin sign out
            </button>
          </div>
        ) : null}
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login setIsSignedIn={setIsSignedIn} />}
        />
        <Route
          path="/menu"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Menu />
            </Protected>
          }
        ></Route>
        <Route
          path="/show/:_id"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Show />
            </Protected>
          }
        ></Route>
        <Route
          path="/:_id"
          element={
            <Protected isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>
              <UserProfile setIsSignedIn={setIsSignedIn} />
            </Protected>
          }
        ></Route>
        <Route
          path="/:_id/edit/:_id"
          element={
            <Protected isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>
              <EditUser setIsSignedIn={setIsSignedIn} />
            </Protected>
          }
        ></Route>
        <Route
          path="/booking"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Bookings />
            </Protected>
          }
        ></Route>
        <Route
          path="/admin"
          element={<Admin setIsAdmin={setIsAdmin} />}
        ></Route>
        <Route
          path="/userlist"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <UserList />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/bookinglist"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <BookingList />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/showlist"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <ShowCrud />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/showlist/insert"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <AddShow />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/showlist/:_id"
          element={
            <ProtectedAdmin isAdmin={isAdmin} setIsAdmin={setIsAdmin}>
              <EditShow />
            </ProtectedAdmin>
          }
        ></Route>
        <Route path="/login/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
