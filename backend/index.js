require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const donorUserController = require("./controllers/donorUserController");
const donateeUserController = require("./controllers/donateeUserController");
const listingController = require("./controllers/listingController");
const PORT = process.env.PORT || 3000;
const multer = require('multer')

const passport = require("passport");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

app.use(passport.initialize());
app.use('/public', express.static('public'))
// Routes
app.use("/api/donoruser", donorUserController);
app.use("/api/listings", listingController);
app.use("/api/donateeuser", donateeUserController)

app.set("port", process.env.PORT || 3000)

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${PORT} 🌟`);
});
