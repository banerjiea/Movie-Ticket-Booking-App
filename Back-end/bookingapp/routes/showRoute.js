var express = require("express");
var upload = require("../config/upload");
var router = express.Router();

const SC = require("../controllers/showController");

router.get("/", (req, res) => {
  res.send("<h3>Show info server is running</h3>");
});

router.get("/showall", SC.showall);

router.post("/showupload", upload.single("profileImg"), SC.insertinfo);

router.get("/allinfo/:showid", SC.showbyid);

router.put("/update/:sid", SC.updateinfo);

router.delete("/delete/:showid", SC.delinfo);

module.exports = router;
