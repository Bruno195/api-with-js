const {Router} = require("express")
const router = Router()

const userController = require("../controllers/UserController")
const loginRequired = require("../middlewares/loginRequired")

//shouldn't exist
//router.get("/", userController.index)
//router.get("/:id", userController.show)

router.post("/", loginRequired, userController.store)
router.put("/", loginRequired, userController.update)
router.delete("/", loginRequired, userController.delete)

module.exports = router
