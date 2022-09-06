const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/reactData";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Running"))
  .catch(() => console.log("error"));
