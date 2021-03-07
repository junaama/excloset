const mongoose = require('../db/connection')

const listingSchema = new mongoose.Schema({

    "image": {
       type: String
    },
    "description": String, 
    "age": String,
    "size": String,
    "style": String,
    user: 
        {
          ref: "User",
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
      
})

const Listings = mongoose.model("Listings", listingSchema)
module.exports = Listings