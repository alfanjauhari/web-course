const { Router } = require('express');
const teacherController = require('./teacherController');

const router = Router();

router.get('/', teacherController.index);
router.get('/:id', teacherController.getOne);
router.post('/', teacherController.insert);
router.put('/:id', teacherController.update);
router.delete('/:id', teacherController.delete);

module.exports = router;
