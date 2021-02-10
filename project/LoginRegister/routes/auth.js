const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')
const {verify} = require('../middleware/jwt')

router.post('/SignUp', authController.register)
router.post('/SignIn', authController.login)
router.post('/profile', verify, authController.profile)

module.exports = router