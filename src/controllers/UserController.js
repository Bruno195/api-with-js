
const User = require("../models/User")

class UserController {


    async store(req, res) {

        try {
            const body = req.body
            const newStudent = await User.create(body)
            const {id, nome, email} = newStudent
            return res.json({id, nome, email})
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                errors: e.errors.map(err => err.message)
            })
        }

    }

    //Index
    async index(req, res){
        try{
            const users = await User.findAll({attributes: ['id', 'nome', 'email']})
         

           return res.json(users)
        }catch(e){
            return res.json(null)
        }
    }


    //Show
    async show(req, res){
        try{
            
            const user = await User.findByPk(req.params.id)
            const {id, nome, email} = user
           return res.json({id, nome, email})
        }catch(e){
            return res.json(null)
        }
    }


    //update

    async update(req, res){
        try{
           

            if(!req.params.id){
                return res.status(400).json({
                    erros: ["Id not send"]
                })
            }
           

            const user = await User.findByPk(id)

            if(!user){
                return res.status(400).json({
                    erros: ["User dont exist"]
                })
            }


          const newDatas = await user.update(req.body)
          const {id, nome, email} = newDatas

           return res.json({id, nome, email})
        }catch(e){
            return  res.status(400).json({

                errors: e.errors.map((err) => err.message)

            }

            )
        }
    }

    //delete

    async delete(req, res){
        try{
            

            const user = await User.findByPk(req.params.id)
           

           
            if(!user){
                return res.status(400).json({
                    erros: ["User dont exist"]
                })
            }
            

            await user.destroy()
            return res.json(null)


        }catch(e){
            return  res.status(400).json({

                errors: e.errors.map((err) => err.message)

            }

            )
        }
    }


}





module.exports = new UserController()