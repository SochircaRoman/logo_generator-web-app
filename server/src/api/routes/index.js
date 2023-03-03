const Router = require('express').Router;

const router = new Router();

const modules = ['auth', 'users']

modules.forEach(module => {
    router.use(`/api/${module}`, require(`./${module}`))
})

module.exports = router