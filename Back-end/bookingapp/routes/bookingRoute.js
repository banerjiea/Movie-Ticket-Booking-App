var express = require("express");
var router = express.Router();

const BC = require("../controllers/bookingController");

router.get("/", (req, res) => {
  res.send("<h3>Booking server is running</h3>");
});

router.get("/showall", BC.showall);

router.post("/insert", BC.insertinfo);

router.post("/useremail", BC.showbyemail);

router.delete("/delete/:bookid", BC.delinfo);

module.exports = router;
