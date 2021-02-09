const { Router } = require('express');
const usersController = require('./usersController');

const router = Router();

router.get('/', usersController.index);
router.get('/:username', usersController.getOne);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
