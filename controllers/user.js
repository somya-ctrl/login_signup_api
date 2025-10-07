const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const {User,TempUser}= require('../models/User');
const { sendOtpEmail } = require('../mailer');

//  hash the OTP
function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp.toString()).digest('hex');
}

async function handlUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required!");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).send("User with this email already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otphash = hashOtp(otp);
    const otpexpires = new Date(Date.now() + 10 * 60 * 1000);
  
    const tempUser = new TempUser({
    email,
    password,
    otphash,
    otpexpires: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
});
await tempUser.save();


const finalUser = new User({
    email,
    password,
    name,
    isVerified: true 
});
await finalUser.save(); 

    

    await User.findOneAndUpdate({ email }, { otphash, otpexpires });

    await sendOtpEmail(email, otp);
    console.log("OTP for testing:", otp);

    return res.status(200).send("Signup successful! OTP sent to your email.");
  } catch (err) {
    console.error("Error in Signup:", err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }
}


async function verifyotp(req, res) {
  console.log("Received body:", req.body);
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Missing email or otp' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No user found' });
    if (user.isverified) return res.status(400).json({ message: 'User already verified' });
    if (!user.otphash || !user.otpexpires) return res.status(400).json({ message: 'No OTP set for user' });
    if (user.otpexpires < new Date()) return res.status(400).json({ message: 'OTP expired' });

    const incomingHash = hashOtp(otp);
    if (incomingHash !== user.otphash) return res.status(400).json({ message: 'Invalid OTP' });

    user.isverified = true;
    user.otphash = undefined;
    user.otpexpires = undefined;
    await user.save();

    return res.json({ message: 'Email verified. Registration complete.' });
  } catch (err) {
    console.error("Error in verifyotp:", err.message);
    return res.status(500).json({ message: `Server error: ${err.message}` });
  }
}

module.exports = {
  handlUserSignup,
  verifyotp,
};
