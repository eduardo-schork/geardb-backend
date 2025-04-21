import { Router } from 'express';
import MediaController from '../controllers/media.controller';

const router = Router();

router.get('/', MediaController.findAll);
router.get('/:id', MediaController.findOne);
router.post('/', MediaController.create);
router.put('/:id', MediaController.update);
router.delete('/:id', MediaController.delete);

export default router;
