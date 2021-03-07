const mongoose = require('../db/connection')

const listingSchema = new mongoose.Schema({

    "date": Date,
    "image": {
        data: Buffer,
        contentType: String
    },
    "description": String, 
    "age": String,
    "size": String,
    "style": String
})

const Listings = mongoose.model("Listings", listingSchema)
module.exports = Listings