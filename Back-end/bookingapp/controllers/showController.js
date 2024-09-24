const show = require("../models/showModel");

class ShowController {
  static showall = async (req, res) => {
    try {
      let data = await show.find({});
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };

  static insertinfo(req, res) {
    const url = req.protocol + "://" + req.get("host");

    const data = new show({
      showname: req.body.showname,
      showtype: req.body.showtype,
      showvotes: req.body.showvotes,
      showrating: req.body.showrating,
      showduration: req.body.showduration,
      showcast: req.body.showcast,
      showdescr: req.body.showdescr,
      profileImg: url + "/public/" + req.file.filename,
    });
    data
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Show registered successfully!",
          userCreated: {
            _id: result._id,
            name: result.showname,
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
  static showbyid = async (req, res) => {
    try {
      let sid = req.params.showid;
      let data = await show.findById(sid);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };
  static updateinfo = async (req, res) => {
    try {
      let showid = req.params.sid;
      const {
        showname,
        showtype,
        showvotes,
        showrating,
        showduration,
        showcast,
        showdescr,
        profileImg,
      } = req.body;
      let showdata = await show.findById(showid);
      showdata.showname = showname || showdata.showname;
      showdata.showtype = showtype || showdata.showtype;
      showdata.showvotes = showvotes || showdata.showvotes;
      showdata.showrating = showrating || showdata.showrating;
      showdata.showduration = showduration || showdata.showduration;
      showdata.showcast = showcast || showdata.showcast;
      showdata.showdescr = showdescr || showdata.showdescr;
      showdata.profileImg = profileImg || showdata.profileImg;
      let result = await showdata.save();
      if (result) {
        res.status(200).json({ msg: "update is done successfully" });
      } else {
        res.status(200).json({ msg: "update failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  static delinfo = async (req, res) => {
    try {
      let sid = req.params.showid;
      let result = await show.findByIdAndDelete(sid);
      if (result) {
        res.status(200).json({ msg: "show deleted successfully" });
      } else {
        res.status(200).json({ msg: "delete operation failed" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ShowController;
