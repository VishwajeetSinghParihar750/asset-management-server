const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { readdirSync } = require("fs");

require("dotenv").config();

const app = express();

// connecting to databasr
mongoose
  .connect(process.env.MONGO_URI, { dbName: "assetManagementDb" })
  .then(() => console.log("DB CONNECTED..."))
  .catch((e) => console.log(e));

app.use(cookieParser());

// parses json
app.use(
  cors({
    origin(origin, cb) {
      cb(null, origin);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev")); // gives data about incoming requests on console

// this will set all routes , no need to do it manually
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

let port = process.env.port || 8000;

app.listen(port, (err) => console.log(`working on port : ${port}`));
