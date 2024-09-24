var express = require("express");
var upload = require("../config/upload");
var router = express.Router();

const AC = require("../controllers/adminController");

router.get("/", (req, res) => {
  res.send("<h3>Admin info server is running</h3>");
});

router.get("/showall", AC.showall);

router.post("/adminupload", upload.single("profileImg"), AC.insertinfo);

router.post("/login", AC.logadmin);

module.exports = router;
