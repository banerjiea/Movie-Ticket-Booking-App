const mongoose = require("../database/dbconnect");

const bookingSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    useremail: { type: String, required: true },
    showname: { type: String, required: true },
    showdate: { type: String },
    showtime: { type: String },
    hallname: { type: String },
    tickets: { type: Number },
    ticketsprice: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
