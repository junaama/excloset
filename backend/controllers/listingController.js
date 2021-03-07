const express = require("express");
const router = express.Router();
const Listing = require("../models/listings")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null, 'uploads')
    },
    filename: (req,file,cb)=> {
        cb(null, file.fieldname + '-', + Date.now())
    }
})

const upload = multer({storage: storage})

router.get('/', (req,res)=> {
    Listing.find({}, (err, items)=> {
        if (err){
            console.log(err);
            res.status(500).send('And errore occured', err)
        } else {
            res.render('imagesPage', {items: items})
        }
    })
})

router.post('/', upload.single('image', (req,res,next)=> {
    const obj = {
        "image": {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        "description": req.body.description, 
        "age": req.body.age,
        "size": req.body.size,
        "style": req.body.style
    }
    Listing.create(obj, (err, item)=> {
        if(err) console.log(err);
        else res.redirect('/')
    })
}))


module.exports = router