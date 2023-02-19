require("dotenv").config({path: "../.env"});

const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const startServer = async () => {
  try {
      require('./database').init()
      app.listen(process.env.SERVER_PORT, process.env.SERVER_URL, () => {
        console.log(`Server started on PORT = ${process.env.SERVER_PORT}`)
      })
  } catch (error) {
      console.log(error)
  }
};
startServer();