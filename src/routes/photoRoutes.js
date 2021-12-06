const {Router} = require("express")

const router = Router()
const loginRequired = require("../middlewares/loginRequired")
const photoController = require("../controllers/PhotoController")



router.post("/", loginRequired, photoController.store)



module.exports = router
