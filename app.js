require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = {
  origin: process.env.port,
  optionSuccessStatus: 200,
};
const navigation = require("./src/navigation", cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(navigation);
app.use("*", (req, res) => {
  res.send("404 PAGE NOT FOUND").status(404);
});

app.listen(process.env.PORT, () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});
