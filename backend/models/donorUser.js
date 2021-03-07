const mongoose = require("../db/connection.js");
// Requires mongoose variable exported from the connection.js file
const donorUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      ref: "Listing",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
 
});

const DonorUser = mongoose.model("DonorUser", donorUserSchema);

module.exports = DonorUser;
