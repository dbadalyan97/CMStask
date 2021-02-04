const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')

router.post('/SignUp', authController.register)
router.post('/SignIn', authController.login)

module.exports = router