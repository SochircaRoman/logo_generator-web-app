const Router = require("express").Router;
const router = new Router();

const controller = require('../controllers/LogosController');

// Authorization filter middleware
const authorization  = require("../middlewares/AuthMiddleware");

// Only Admin acces


// Only Users acces
router.route('/saveLogo').get(authorization.userAuth).post(controller.saveLogo);
router.route('/').get(authorization.userAuth).get(controller.getLogos);


module.exports = router