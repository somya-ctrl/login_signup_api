const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');

async function handlUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send("All fields are required!");
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.send("User with this email already exists!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    await User.create({
      name,
      email,
      password: passwordHash,
      isVerified: false,
    });

    return res.send("Signup successful!"); // Or redirect to a page
  } catch (err) {
    console.error(err);
    res.send("Server error");
  }
}


module.exports={
    handlUserSignup,
}