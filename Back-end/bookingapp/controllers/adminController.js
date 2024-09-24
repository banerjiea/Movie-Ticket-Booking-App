const admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

class AdminController {
  static showall = async (req, res) => {
    try {
      let data = await admin.find({});
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };
  static insertinfo(req, res) {
    const url = req.protocol + "://" + req.get("host");
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.adminpw, salt);
    const data = new admin({
      adminname: req.body.adminname,
      adminpw: hashPassword,
      adminemail: req.body.adminemail,
      adminage: req.body.adminage,
      admingender: req.body.admingender,
      profileImg: url + "/public/" + req.file.filename,
    });
    data
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Admin registered successfully!",
          userCreated: {
            _id: result._id,
            name: result.adminname,
            profileImg: result.profileImg,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
  static logadmin = async (req, res) => {
    try {
      const data = req.body;
      //username check
      const result = await admin.findOne({ adminemail: data.adminemail });
      if (!result) {
        res.status(200).json({ msg: "Admin email is invalid" });
      } else {
        //password decryp and match
        const isMatch = bcrypt.compareSync(data.adminpw, result.adminpw); //(user_given_pwd,db_hash_pwd)
        if (!isMatch) {
          res.status(200).json({ msg: "Password is invalid" });
        } else {
          res.status(200).json(result);
        }
      }
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
}

module.exports = AdminController;
