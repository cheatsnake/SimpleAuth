const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');

router.post('/registration', [
    check('username', 'Username length need to be from 4 symbols to 12 symbols').isLength({min: 4, max: 12}),
    check('password', 'Password length need to be from 6 symbols to 16 symbols').isLength({min: 6, max: 16})
    ], controller.registration);
router.post('/login', controller.login);
router.get('/check', controller.checkServer);

module.exports = router
