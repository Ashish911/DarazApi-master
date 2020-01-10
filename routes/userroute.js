const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jwtSecrect="ashish";

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            phoneNo: req.body.phoneNo,
            smsCode: req.body.smsCode
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, jwtSecrect);
            res.json({ status: "Signup success!",token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        // let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!' });
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;