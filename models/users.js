const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    phoneNo: {
        type:Number,
        required:true
    },
    smsCode: {
        type:Number,
        required:true
    }
})

const User = mongoose.model('User', UsersSchema)
module.exports = User