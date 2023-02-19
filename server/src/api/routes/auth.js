const Router = require("express").Router;
const router = new Router();

const controller  = require("../controllers/AuthController")

router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router