const mongoose = require("../database/dbconnect");

const adminSchema = mongoose.Schema(
  {
    adminname: { type: String, required: true },
    adminpw: { type: String, required: true },
    adminemail: { type: String, unique: true },
    adminage: { type: Number },
    admingender: { type: String },
    profileImg: { type: String },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admininfo", adminSchema);

module.exports = Admin;
