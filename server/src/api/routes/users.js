const Router = require("express").Router;
const router = new Router();

const controller = require('../controllers/UsersController');

// Authorization filter middleware
const authorization  = require("../middleware/AuthMiddleware");

// Only Admin acces
router.route('/').get(authorization.adminAuth).get(controller.getUsers);
router.route('/:id').get(authorization.adminAuth).get(controller.getUser);

// Only Users acces
router.route('/updateUsername/:id').get(authorization.userAuth).patch(controller.updateUsername);
router.route('/updatePassword/:id').get(authorization.userAuth).patch(controller.updateUserPassword);
router.route('/deleteUser/:id').get(authorization.userAuth).delete(controller.deleteUser);


module.exports = router