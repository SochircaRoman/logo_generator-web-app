require("dotenv").config({path: "../.env"});

const express = require("express");
const fileUpload = require("express-fileUpload");
const cors = require("cors");
const router = require("./api/routes/index");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(fileUpload({
  limits: {
      fileSize: 1024 * 1024 // 1 MB
  },
  abortOnLimit: true
}));

app.use(express.json());
app.use(express.static("src/jsmodel"));
app.use(express.static("src/api/static"));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

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