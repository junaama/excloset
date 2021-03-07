const mongoose = require('../db/connection')

const listingSchema = new mongoose.Schema({

    "image": {
       type: String
    },
    "description": String, 
    "age": String,
    "size": String,
    "style": String
})

const Listings = mongoose.model("Listings", listingSchema)
module.exports = Listings