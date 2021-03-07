const express = require("express");
const router = express.Router();
const Listing = require("../models/listings")
const multer = require('multer')
const fs = require('fs')

const path = require("path");

const DIR = './public'
const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null, DIR)
    },
    filename: (req,file,cb)=> {
        cb(null, file.fieldname + '-', + Date.now())
    }
})

const upload = multer({storage: storage, fileFilter: (req,file,cb)=> {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null, true)
    } else {
        cb(null, false);
        return cb(new Error('Only jpeg, jpg, or png format allowed.'))
    }
    }
})

router.get('/', (req,res)=> {

    Listing.find().then(data=> {
        res.status(200).json({message: "Listings retrieved successfully.",listings: data})
    })

})

router.post('/', upload.single('image'), async (req,res,next)=> {


    const url = req.protocol + "://" + req.get("host")
    console.log("URL:", url)
    console.log("FILE: ", req.file)

    const listing = new Listing({
        image: url + '/public/' + req.file.filename,
        description: req.body.description,
        age: req.body.age,
        size: req.body.size,
        style: req.body.style
    })
    listing.save().then(result=> {
        res.status(201).json({
            message: "Listing created successfully",
            listingCreated: {
                _id: result._id,
                image: result.image,
            }
        })
    }).catch(err=>{
        console.error(err),
        res.status(500).json({
            error:err
        })
    })


})


module.exports = router