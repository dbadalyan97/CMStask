const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.verify = async function(req, res, next){
    let accessToken = req.cookies.jwt
    
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if (!payload) {
            return res.status(401).json({ message: 'unauthorized' })
          } else {
            req.user = await User.findById(payload.id)
            
            next()
          }
    }
    catch(e){
        console.log(e)
        return res.status(401).send()
    }
}
