const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')
const {verify} = require('../middleware/jwt')

router.post('/SignUp', authController.register)
router.post('/SignIn', authController.login)
router.post('/profile', verify, authController.profile)
// router.route('/profile')
// .delete(deleteToDo)
// .put(editToDo)

module.exports = router