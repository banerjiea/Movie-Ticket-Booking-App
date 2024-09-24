import React, { useEffect, useState } from "react";
import axios from "axios";
const BookingList = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    loadBook();
  });

  const loadBook = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/bookingapi/showall"
      );
      setBook(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      {book.length === 0 ? (
        <div className="mt-4">No booking available!!</div>
      ) : (
        <div>
          <h3>List of Bookings</h3>
          <table className="table border shadow">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Hall Name</th>
                <th scope="col">Number of Tickets</th>
                <th scope="col">Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {book.map((books, index) => (
                <tr>
                  <th scope="row"> {index + 1}</th>
                  <td>{books.username}</td>
                  <td>{books.useremail}</td>
                  <td>{books.showname}</td>
                  <td>{books.showdate}</td>
                  <td>{books.showtime}</td>
                  <td>{books.hallname}</td>
                  <td>{books.tickets}</td>
                  <td>{books.ticketsprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;
