require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//db connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};
connectDB();

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () => {
    console.log("Connected to DB");
    console.log("Server running in port " + process.env.PORT);
  });
});

app.use("/", require("./Routes/routes"));
