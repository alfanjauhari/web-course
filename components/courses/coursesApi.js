const { Router } = require('express');
const coursesController = require('./coursesController');

const router = Router();

router.get('', coursesController.category);
router.get('/', coursesController.index);
router.get('/:slug', coursesController.getOne);
router.post('/insert', coursesController.insert);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);

module.exports = router;
