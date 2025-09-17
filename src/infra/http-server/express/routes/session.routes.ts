import { Router } from 'express';
import SessionController from '../controllers/session.controller';

const router = Router();

router.get('/', SessionController.findAll);
router.get('/:id', SessionController.findOne);
router.post('/', SessionController.create);
router.put('/:id', SessionController.update);
router.delete('/:id', SessionController.delete);

export default router;
