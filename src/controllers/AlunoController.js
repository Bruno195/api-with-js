
const Aluno = require("../models/Aluno")
const Foto = require("../models/Foto")

class AlunoController {

    
  async  index(req, res){
         
        const alunos =  await Aluno.findAll({
          attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
          order: [['id', 'DESC'], [Foto, "id", "DESC"]],
          include: {
            model: Foto,
            attributes: ['url', 'filename']
          }
        })

        res.json(alunos)
    }

  async store(req, res){

    try {

      const aluno = await Aluno.create(req.body)


      return res.json({aluno})
    } catch(e){
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
        
      })
    }
     



  }  

  async show(req, res){
   try {
     const {id} = req.params
     
      if(!id){
        res.status(400).json({
          errors: ["Missing ID"]
        })
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"],
        order: [['id', 'DESC'], [Foto, "id", "DESC"]],
        include: {
          model: Foto,
          attributes: ['url', 'filename']
          }
        })

      if(!aluno){
        res.status(400).json({
          errors: ["Student not found"]
        })
      }


      return res.json(aluno)


   } catch(e){
    return res.status(400).json({
      errors: e.errors.map(err => err.message)
    })
   }

}  

  async delete(req, res){
    try {
      const {id} = req.params
      
       if(!id){
         res.status(400).json({
           errors: ["Missing ID"]
         })
       }
 
       const aluno = await Aluno.findByPk(id)
 
       if(!aluno){
         res.status(400).json({
           errors: ["Student not found"]
         })
       }
 
 
       await aluno.destroy()
 
       return res.json({message: "Student was removed"})
 
 
    } catch(e){
     return res.status(400).json({
       errors: e.errors.map(err => err.message)
     })
    }
  }  

  async update(req, res){
    try {
      const {id} = req.params
      
       if(!id){
         res.status(400).json({
           errors: ["Missing ID"]
         })
       }
 
       const aluno = await Aluno.findByPk(id)
 
       if(!aluno){
         res.status(400).json({
           errors: ["Student not found"]
         })
       }
 
 
       const newStudent = await aluno.update(req.body)


       return res.json(newStudent)
 
 
    } catch(e){
     return res.status(400).json({
       errors: e.errors.map(err => err.message)
     })
    }
  }  


}





module.exports = new AlunoController()