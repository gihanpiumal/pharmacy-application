const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express();
app.use(cors())

// impport routes
const allRoutes = require("./routes/routes");

// middlewire
app.use(bodyparser.json());

app.use(allRoutes)

const PORT = process.env.PORT || 8000;
const DB_URL =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pharmacy-system.qz3sotz.mongodb.net/?retryWrites=true&w=majority`;
//   "mongodb+srv://gihan:gihan123@pharmacy-system.qz3sotz.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB-Connected");
  })
  .catch((err) => console.log("DB connection error"));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});