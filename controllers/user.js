const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const {User,TempUser}= require('../models/user');
const { sendOtpEmail } = require('../mailer');
function hashOtp(otp) {
  return crypto.createHash('sha256').update(String(otp)).digest('hex');
}

// Signup: create TempUser & send OTP
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otphash = hashOtp(otp);
    const otpexpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Upsert TempUser
    await TempUser.findOneAndUpdate(
      { email },
      { name, email, password: passwordHash, otphash, otpexpires },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Send OTP email
    await sendOtpEmail(email, otp);
    console.log('OTP (for testing):', otp);

    return res.status(200).json({ message: 'Signup successful! OTP sent to email.' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// Verify OTP & create final User
async function verifyotp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Missing email or OTP' });

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) return res.status(400).json({ message: 'No pending verification for this email' });

    if (tempUser.otpexpires < new Date()) {
      await TempUser.deleteOne({ email });
      return res.status(400).json({ message: 'OTP expired' });
    }

    const incomingHash = hashOtp(otp);
    if (incomingHash !== tempUser.otphash) return res.status(400).json({ message: 'Invalid OTP' });

    // Create final User
    const newUser = new User({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password, // already hashed
      isVerified: true
    });

    await newUser.save();
    await TempUser.deleteOne({ email });

    return res.status(200).json({ message: 'Email verified. Registration complete.' });
  } catch (err) {
    console.error('verifyOtp error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { handleUserSignup, verifyotp };




   
