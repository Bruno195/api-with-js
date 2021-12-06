const {Router} = require("express")
const router = Router()
const alunoController = require("../controllers/AlunoController")
const loginRequired = require("../middlewares/loginRequired")

router.get("/", alunoController.index)
router.post("/", loginRequired ,alunoController.store)
router.put("/:id", loginRequired, alunoController.update)
router.get("/:id", alunoController.show)
router.delete("/:id", loginRequired, alunoController.delete)



module.exports = router



