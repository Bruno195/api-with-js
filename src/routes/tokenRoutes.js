const {Router} = require("express")
const tokenController = require("../controllers/TokenController")
const route = Router()


route.post("/", tokenController.store)


module.exports = route