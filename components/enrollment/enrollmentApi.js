const { Router } = require('express');
const enrollmentController = require('./enrollmentController');

const router = Router();

router.get('/', enrollmentController.index);
router.get('/:id', enrollmentController.getOne);
router.post('/:id', enrollmentController.enroll);
router.put('/:id', enrollmentController.update);

module.exports = router;
