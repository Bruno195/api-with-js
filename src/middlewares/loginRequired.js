const jwt = require("jsonwebtoken")
const User = require("../models/User")
module.exports = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({
            errors: ['Login required']
        })
    }

    const [texto, token] = authorization.split(' ')
    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET)

        const {id, email} = dados

        const user = await User.findOne({
            where: {
                id: id,
                email: email
            }
        })

        if(!user){
            return res.status(401).json({
                errors: ['Invalid user']
            })      
        }

        req.userId = id
        req.userEmail = email

        return next()
    } catch(e){
        console.log(e)
        return res.status(401).json({
            errors: ['Token expirado or invalid']
        })   
    }
}

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxMCwiZW1haWwiOiJyaWJlcnlAZ21haWwuY29tIiwiaWF0IjoxNjM4NTQ5Mzg3LCJleHAiOjE2Mzg5ODEzODd9.xdowTdXFlqLBp88Sv1-UGm9gGK6J_vdVHv4dfT5JN0Y