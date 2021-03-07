const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const donateeUser = require("../models/donateeUser");
const auth = require("../middlewares/auth");
const Task = require("../models/listings");
require("dotenv").config();

//register
router.post("/register", async (req, res) => {
  try {
    let { email, password, password2, username } = req.body;

    if (!email || !password || !password2) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password !== password2) {
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });
    }
    const existingUser = await donateeUser.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }
    if (!username) {
      username = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new donateeUser({
      email,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    const user = await donateeUser.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await donateeUser.find();
    return res.json({ users });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});
//get single user
router.get("/:id", async (req, res) => {
  const user = await donateeUser.findById(req.params.id);
  res.json({
    username: user.username,
    id: user._id,
    plans: user.plans,
    verses: user.verses,
  });
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await donateeUser.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await donateeUser.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
