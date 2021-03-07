const mongoose = require("../db/connection.js");
// Requires mongoose variable exported from the connection.js file
const donateeUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },

 
});

const DonateeUser = mongoose.model("DonateeUser", donateeUserSchema);

module.exports = DonateeUser;
