/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import swal from "sweetalert";
const Bookings = () => {
  const [booking, setBooking] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    loadUsers();
  }, [user]);

  const loadUsers = async () => {
    const users = user.useremail;
    try {
      const result = await axios.post(
        "http://localhost:4000/bookingapi/useremail",
        { useremail: users }
      );
      setBooking(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.log(error);
      setBooking([]);
    }
  };

  const deleteUser = async (_id) => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will not be able to recover this show!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:4000/bookingapi/delete/${_id}`);
          swal(
            "The booking has been cancelled!",
            "You will receive 50% of the ticket price within 3 business days",
            {
              icon: "success",
            }
          );
          loadUsers(); // Refresh the list after successful deletion
        } catch (error) {
          console.log(error);
          swal("Oops! Something went wrong.", {
            icon: "error",
          });
        }
      } else {
        swal("The booking is safe!");
      }
    });
  };

  console.log(booking);
  console.log(user);
  return (
    <div className="container">
      <div>
        <h3>Hello {user.username}, check your upcoming events..</h3>
        {booking.length === 0 ? (
          <div className="mt-4">You are not booked any shows yet!!</div>
        ) : (
          <table className="table border shadow">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Hall Name</th>
                <th scope="col">Number of tickets</th>
                <th scope="col">Payment Made(Rs/-)</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book, index) => (
                <tr>
                  <th scope="row"> {index + 1}</th>
                  <td>{book.showname}</td>
                  <td>{book.showdate}</td>
                  <td>{book.showtime}</td>
                  <td>{book.hallname}</td>
                  <td>{book.tickets}</td>
                  <td>{book.ticketsprice}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger mr-2"
                      onClick={() => deleteUser(book._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;
