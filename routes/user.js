
const express = require("express");
const { handleUserSignup, verifyotp } = require("../controllers/user");
const router = express.Router();

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', handleUserSignup);

router.get('/verify-otp', (req, res) => res.render('verify-otp'));
router.post('/verify-otp', verifyotp);

module.exports = router;