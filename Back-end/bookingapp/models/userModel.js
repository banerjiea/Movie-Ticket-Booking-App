const mongoose = require("../database/dbconnect");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    userpw: { type: String, required: true },
    useremail: { type: String, unique: true },
    userage: { type: Number },
    usergender: { type: String },
    profileImg: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("userinfo", userSchema);

module.exports = User;
