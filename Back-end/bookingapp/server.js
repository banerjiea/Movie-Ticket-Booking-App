const express = require("express");
const cors = require("cors");

const api = require("./routes/userRoute");
const showapi = require("./routes/showRoute");
const bookingapi = require("./routes/bookingRoute");
const adminapi = require("./routes/adminRoute");
const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/public", express.static("public")); //public folder configure for file upload

app.use("/api", api);

app.use("/showapi", showapi);

app.use("/bookingapi", bookingapi);

app.use("/adminapi", adminapi);

app.listen(port, () => {
  console.log(`server is running in the port ${port}`);
});
