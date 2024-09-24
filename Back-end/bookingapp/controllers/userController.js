const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UserController {
  static showall = async (req, res) => {
    try {
      let data = await user.find({});
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };
  static async insertinfo(req, res) {
    try {
      // Check if the email already exists
      const existingUser = await user.findOne({
        useremail: req.body.useremail,
      });
      if (existingUser) {
        return res.status(200).send({
          success: false,
          message: "Email is already registered",
        });
      }
      const url = req.protocol + "://" + req.get("host");
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.userpw, salt);
      const data = new user({
        username: req.body.username,
        userpw: hashPassword,
        useremail: req.body.useremail,
        userage: req.body.userage,
        usergender: req.body.usergender,
        profileImg: url + "/public/" + req.file.filename,
      });
      await data.save();
      res.status(200).json({
        message: "Account created successfully!",
        userCreated: {
          _id: data._id,
          name: data.username,
          profileImg: data.profileImg,
        },
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
  static updateinfo = async (req, res) => {
    try {
      let userid = req.params.uid;
      const { username, userpw, useremail, userage, usergender, profileImg } =
        req.body;
      let userdata = await user.findById(userid);
      userdata.username = username || userdata.username;
      userdata.userpw = userpw || userdata.userpw;
      userdata.useremail = useremail || userdata.useremail;
      userdata.userage = userage || userdata.userage;
      userdata.usergender = usergender || userdata.usergender;
      userdata.profileImg = profileImg || userdata.profileImg;
      let result = await userdata.save();
      if (result) {
        res.status(200).json({ msg: "update is done successfully" });
      } else {
        res.status(200).json({ msg: "update failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  static loguser = async (req, res) => {
    try {
      const data = req.body;
      //username check
      const result = await user.findOne({ useremail: data.useremail });
      if (!result) {
        res.status(200).json({ msg: "User email is invalid" });
      } else {
        //password decryp and match
        const isMatch = bcrypt.compareSync(data.userpw, result.userpw); //(user_given_pwd,db_hash_pwd)
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
  static showbyid = async (req, res) => {
    try {
      let uid = req.params.userid;
      let data = await user.findById(uid);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };
  static delinfo = async (req, res) => {
    try {
      let uid = req.params.userid;
      let result = await user.findByIdAndDelete(uid);
      if (result) {
        res.status(200).json({ msg: "user deleted successfully" });
      } else {
        res.status(200).json({ msg: "delete operation failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = UserController;
