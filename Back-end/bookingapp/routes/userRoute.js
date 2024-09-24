var express = require("express");
var upload = require("../config/upload");
var router = express.Router();

const UC = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("<h3>User info server is running</h3>");
});

router.get("/showall", UC.showall);

router.post("/userupload", upload.single("profileImg"), UC.insertinfo);

router.put("/update/:uid", UC.updateinfo);

router.post("/login", UC.loguser);

router.get("/allinfo/:userid", UC.showbyid);

router.delete("/delete/:userid", UC.delinfo);

module.exports = router;
