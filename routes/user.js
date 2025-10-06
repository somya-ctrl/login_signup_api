const express = require("express");
const {handlUserSignup} = require("../controllers/user");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true })); // for form data

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', handlUserSignup);
router.post('/verify-otp', handlUserSignup);
router.post('/login', handlUserSignup);


module.exports = router;