const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const objects = require('../models/objects');
const {verify} = require('../middleware/jwt')


const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
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
        let finded = await User.findOne({email: user.email})
        console.log(finded)
        if (finded) {
            res.json({
                message: 'This email already exsist'
            })
        } else {
            let savedUser = await user.save();
            if (savedUser) {
                res.json({
                    message: 'User added successfully'
                })
            } else {
                res.json({
                    message: 'An error occured'
                })
            }
        }
    })
}


const login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let findedEmail = await User.findOne({email})
    if (findedEmail) {
        bcrypt.compare(password, findedEmail.password, async (err, result) => {

            if (err) {
                res.json({
                    message: err
                })
            }
            if (result) {
                //console.log(findedEmail)
                const findedObj = await objects.find({createdBy: findedEmail._id})
                console.log(findedObj)
                let payload = {id: findedEmail._id}

                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                })

                res.cookie("jwt", accessToken)
                res.json({findedObj})

            } else {
                res.json({
                    message: 'Password does not matches!'
                })
            }
        })
    } else {
        res.json({
            message: 'This email isnt exisit'
        })
    }
}


const profile = async (req, res) => {
    // console.log(req.body)
    const object = new objects({...req.body})

    const savedObj = await object.save()

    res.json({
        object: savedObj
    })

}

module.exports = {register, login, profile};