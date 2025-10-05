const User = require('../models/user')
async function handlUserSignup(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}
module.exports={
    handlUserSignup,
}