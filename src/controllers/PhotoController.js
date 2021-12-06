const multer = require("multer")
const multerConfig = require("../config/multerConfig")
const Foto = require("../models/Foto")
const upload = multer(multerConfig).single("foto")
class PhotoController {


     store(req, res) {

        return upload(req, res, async (err) => {
            if (err) {
                return res.status(401).json({
                    errors: [err.code]
                })
            }
 
            const {originalname, filename} = req.file
            const {aluno_id} = req.body
            const foto = await Foto.create({originalname, filename, aluno_id})
            console.log(foto)
            return res.json(foto)
        })

    }
}





module.exports = new PhotoController()