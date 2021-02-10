const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt

    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, "gaxtni")
        next()
    }
    catch(e){
        return res.status(401).send()
    }
}