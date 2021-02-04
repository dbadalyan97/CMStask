const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let register = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })
        User.findOne({ email: user.email })
            .then(us => {
                console.log(us)
                if (us) {
                    res.json({
                        message: 'This user already exsist'
                    })
                }
                else {
                    user.save()
                        .then(user => {
                            res.json({
                                message: 'User added successfully'
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error occured'
                            })
                        })
                }
            })
    })
}

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password
    User.findOne({ email })
        .then(user => {
            console.log(req.body)
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    console.log(result)
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            message: 'Login Successful!',
                            token
                        })
                    } else {
                        res.json({
                            message: 'Password does not matches!'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No user found!'
                })
            }
        })
}

module.exports = { register, login };