const booking = require("../models/bookingModel");

class BookingController {
  static showall = async (req, res) => {
    try {
      let data = await booking.find({});
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };
  static insertinfo = async (req, res) => {
    try {
      const {
        username,
        useremail,
        showname,
        showdate,
        showtime,
        hallname,
        tickets,
        ticketsprice,
      } = req.body;
      let bookingdata = new booking();
      bookingdata.username = username;
      bookingdata.useremail = useremail;
      bookingdata.showname = showname;
      bookingdata.showdate = showdate;
      bookingdata.showtime = showtime;
      bookingdata.hallname = hallname;
      bookingdata.tickets = tickets;
      bookingdata.ticketsprice = ticketsprice;
      let result = await bookingdata.save();
      if (result) {
        res.status(200).json({ msg: "booking done successfully" });
      } else {
        res.status(200).json({ msg: "booking failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  static showbyemail = async (req, res) => {
    try {
      let { useremail } = req.body;
      let data = await booking.find({ useremail: useremail });
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: "sorry unable to find any match" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  static delinfo = async (req, res) => {
    try {
      let bid = req.params.bookid;
      let result = await booking.findByIdAndDelete(bid);
      if (result) {
        res.status(200).json({ msg: "booking deleted successfully" });
      } else {
        res.status(200).json({ msg: "delete operation failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = BookingController;
