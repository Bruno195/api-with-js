const User = require("../models/User")
const jwt = require("jsonwebtoken")

class TokenController {

   async store(req, res){
        const {email, password} = req.body
        if(!email || !password){
            return res.status(401).json({
                errors: ['Invalid Credentials']
            })
        }

        const user = await User.findOne({where: {email: email}})  
        
        if(!user){
            return res.status(401).json({
                errors: ["Email don't exist"]
            })
        }



        if(!(await user.passwordIsValid(password))){
            return res.status(401).json({
                errors: ['Password invalid']
            })
        }

        const { id }  = user
        const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        })
       return res.json({token})
     
    }




  
  
    //we need reseacrh if the user already exist in the database


}



module.exports = new TokenController()

