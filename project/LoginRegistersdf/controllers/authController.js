const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const register = (req, res) =>
{
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err)
        {
            res.json({
                error: err
            })
        }
        let user = new User({
            firstName: req.body.firtName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })
        let finded = await User.findOne({email: user.email})
        console.log(finded)
        if (finded)
        {
            res.json({
                message: 'This email already exsist'
            })
        }
        else
        {
            let savedUser = await user.save();
            if (savedUser)
            {
                res.json({
                    message: 'User added successfully'
                })
            }
            else
            {
                res.json({
                    message: 'An error occured'
                })
            }
        }
    })
}

const login = async (req, res) =>
{
    let email = req.body.email;
    let password = req.body.password;

    let findedEmail = await User.findOne({email})
    if (findedEmail)
    {
        bcrypt.compare(password, findedEmail.password, (err, result) => {

            if (err)
            {
                res.json({
                    message: err
                })
            }
            if (result)
            {
                console.log(findedEmail.email)
                let token = jwt.sign({ name: findedEmail.email }, 'verySecretValue', { expiresIn: '1h' })
                res.json({
                    message: 'Login Successful!',
                    token
                })
            }else{
                res.json({
                    message: 'Password does not matches!'
                })
            }
        })
    }
    else
    {
        res.json({
            message: 'This email isnt exisit'
        })
    }
}

module.exports = { register, login };