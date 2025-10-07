const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }, 
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type : String,
        required: true,
    },
    isverified:{
        type: Boolean,
        default: false,
    },
},{timestamps: true})


const TempUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    otphash: { 
        type: String,
        required: true,
    },
    otpexpires: {
        type: Date,
        required: true,
       
        expires: 0 
    },
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);
const TempUser = mongoose.model("TempUser", TempUserSchema);

module.exports = { User, TempUser };