const { Router } = require('express');
const usersController = require('./usersController');
const Auth = require('./auth');

const router = Router();

router.get('/', usersController.index);
router.get('/:username', usersController.getOne);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

// authentication routes
router.post('/register', Auth.register);
router.post('/login', Auth.login);

module.exports = router;
