const Router = require('express').Router;
const fileUpload = require("express-fileUpload");

const router = new Router();

router.use(fileUpload());

const modules = ['auth', 'users']

modules.forEach(module => {
    router.use(`/api/${module}`, require(`./${module}`))
})

module.exports = router