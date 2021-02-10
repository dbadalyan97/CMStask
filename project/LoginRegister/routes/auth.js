const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')
const {verify} = require('../middleware/jwt')

router.post('/SignUp', authController.register)
router.post('/SignIn', verify, authController.login)
router.post('/profile', authController.profile)

module.exports = router