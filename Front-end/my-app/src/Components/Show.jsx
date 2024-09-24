/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import swal from "sweetalert";
const Show = () => {
  const [shows, setShows] = useState([]);
  const [booking, setBooking] = useState({
    username: "",
    useremail: "",
    showname: "",
    showdate: "",
    showtime: "",
    hallname: "",
    tickets: null,
    ticketsprice: 100,
  });
  const navigate = useNavigate();
  const {
    username,
    useremail,
    showname,
    showdate,
    showtime,
    hallname,
    tickets,
    ticketsprice,
  } = booking;
  const { _id } = useParams();
  // const location = useLocation();
  // const { userInfo } = location.state || {};

  const { user } = useUser();

  const onInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
    const { name, value } = e.target;

    // Update booking state with calculated ticketprice if tickets are changed
    if (name === "tickets") {
      const updatedTickets = parseInt(value, 10) || 0; // Convert to integer and handle NaN
      setBooking((prev) => ({
        ...prev,
        tickets: updatedTickets,
        ticketsprice: updatedTickets * prev.ticketsprice, // Calculate total price
      }));
    } else {
      setBooking({ ...booking, [name]: value });
    }
  };

  useEffect(() => {
    loadUsers();
  }, [user]);

  const loadUsers = async () => {
    const result = await axios.get(
      `http://localhost:4000/showapi/allinfo/${_id}`
    );
    setShows(result.data);
  };

  useEffect(() => {
    setBooking((prev) => ({
      ...prev,
      username: user?.username || "",
      useremail: user?.useremail || "",
      showname: shows?.showname || "",
    }));
  }, [user, shows]);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:4000/bookingapi/insert", booking);
      swal(
        "Ticket booked!",
        "You will receive the ticekts in your registered mail id",
        "success"
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 style={{ marginRight: "35rem" }}>
        Book Tickets for the movie - {shows.showname}
      </h1>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "2rem",
        }}
      >
        <img src={shows.profileImg} height="300rem" alt="logo" />
        <p>{shows.showdescr}</p>
        <p>
          {shows.showduration} - {shows.showtype}
        </p>
        <p>Cast - {shows.showcast}</p>
        <p>
          {shows.showvotes}Votes | {shows.showrating}⭐
        </p>
      </div>

      <div style={{ position: "relative", marginLeft: "25rem" }}>
        <form onSubmit={(e) => onSubmit(e)}>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Name"
              name="username"
              value={username}
              readOnly
            />
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="User Email"
              name="useremail"
              value={useremail}
              readOnly
            />
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Password"
              name="showname"
              value={showname}
              readOnly
            />
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <input
              type="date"
              min="2024-09-11"
              max="2024-09-20"
              className="form-control form-control-lg"
              placeholder="Enter Password"
              name="showdate"
              value={showdate}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <select
              className="form-control form-control-lg"
              name="showtime"
              value={showtime}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">Select Showtime</option>
              <option value="2pm">2 PM</option>
              <option value="6pm">6 PM</option>
              <option value="7pm">7 PM</option>
              {/* Add more options if needed */}
            </select>
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <select
              className="form-control form-control-lg"
              name="hallname"
              value={hallname}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="">Select Hall</option>
              <option value="Nandan">Nandan</option>
              <option value="PVR Avani">PVR Avani</option>
              <option value="INOX South City">INOX South City</option>
              {/* Add more options if needed */}
            </select>
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Number of Tickets"
              name="tickets"
              value={tickets}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div
            className="form-group"
            style={{ width: "50%", marginLeft: "16rem" }}
          >
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Number of Tickets"
              name="ticketprice"
              value={ticketsprice}
              readOnly
            />
          </div>
          <button
            className="btn btn-outline-primary  btn-block"
            style={{ width: "25%" }}
          >
            Pay {ticketsprice}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Show;
