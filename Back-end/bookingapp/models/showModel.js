const mongoose = require("../database/dbconnect");

const showSchema = mongoose.Schema(
  {
    showname: { type: String, required: true },
    showtype: { type: String },
    showvotes: { type: String },
    showrating: { type: Number },
    showduration: { type: String },
    showcast: { type: String },
    showdescr: { type: String },
    profileImg: { type: String },
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("showinfo", showSchema);

module.exports = Show;
