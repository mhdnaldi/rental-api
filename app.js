require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
// const corsOption = {
//   origin: "http://localhost:3001/",
//   optionSuccessStatus: 200,
// };
const navigation = require("./src/navigation");

app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(navigation);
app.use("*", (req, res) => {
  res.send("404 PAGE NOT FOUND").status(404);
});

app.listen(process.env.PORT, () => {
  console.log(`LISTENING ON PORT ${process.env.PORT}`);
});
