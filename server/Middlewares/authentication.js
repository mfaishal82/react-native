const verifyToken = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next){
    try {
        let accessToken = req.headers.authorization
        if(!accessToken){
            throw { name: "Unauthenticated"}
        }

        let [type, token] = accessToken.split(' ')
        if(type !== 'Bearer'){
            throw { name: "Unauthenticated"}
        }

        let payload = verifyToken(token)
        // console.log(payload)

        let user = await User.findByPk(payload.id)

        if(!user){
            throw { name: "Unauthenticated"}
        }

        req.user = {
            id : user.id,
            email: user.email,
            role: user.role
        }
        next()
    } catch (error) {
        // console.log(error)
        next(error) 
    }
}