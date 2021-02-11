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
                console.log(findedEmail)
                const findedObj = await objects.findOne({createdBy: findedEmail._id})
                let payload = {id: findedEmail._id, object: findedObj}
                console.log(payload)

                let accessToken = jwt.sign(payload, "gaxtni", {
                    algorithm: "HS256",
                    expiresIn: "1h"
                })

                res.cookie("jwt", accessToken, {secure: true, httpOnly: true, maxAge: 100000})
                res.json({user: findedEmail, token: accessToken});
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
    const object = new objects({
        name: req.body.name,
        fields: req.body.fields,
        tags: req.body.tags,
        createdBy: req.body.id
    })

    const savedObj = await object.save()

    res.json({
        object: savedObj
    })

}

module.exports = {register, login, profile};