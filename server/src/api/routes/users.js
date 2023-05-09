const Router = require("express").Router;
const router = new Router();

const controller = require('../controllers/UsersController');

// Authorization filter middleware
const authorization  = require("../middlewares/AuthMiddleware");

// Only Admin acces
router.route('/').get(authorization.adminAuth).get(controller.getUsers);
router.route('/:id').get(authorization.adminAuth).get(controller.getUser);

// Only Users acces
router.route('/updateUsername/:id').get(authorization.userAuth).patch(controller.updateUsername);
router.route('/updatePassword/:id').get(authorization.userAuth).patch(controller.updatePassword);
router.route('/updateEmail/:id').get(authorization.userAuth).patch(controller.updateEmail);
router.route('/updateProfilePic/:id').get(authorization.userAuth).patch(controller.updateProfilePic);
//router.route('/upload/:id').post(controller.uploadFile);
router.route('/deleteUser/:id').get(authorization.userAuth).delete(controller.deleteUser);


module.exports = router