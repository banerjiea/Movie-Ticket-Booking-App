const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/projectdb");
};

main()
  .then(() => {
    console.log("mongo db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
