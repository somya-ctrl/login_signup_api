const express = require("express");
const { handleUserSignup, verifyotp} = require("../controllers/user");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true })); // for form data

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', handleUserSignup);
router.post('/verify-otp', verifyotp);

module.exports = router;