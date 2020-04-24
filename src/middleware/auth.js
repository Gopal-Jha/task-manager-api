const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async ( req, res, next ) => {

    try{

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify( token, process.env.JWT_SECKET_VALUE)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user){
            throw new Error
        }
        //Adding token and user details in request so that it will 
        //use in at the time of login or logout or somewhere else

        req.token = token
        req.user = user
        next()
    } catch (e){

        res.status(401).send({ error: 'Unauthenticate user!'})
    }
}

module.exports = auth