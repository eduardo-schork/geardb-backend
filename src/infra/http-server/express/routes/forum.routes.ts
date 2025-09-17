import { Router } from 'express';
import ForumController from '../controllers/forum.controller';

const router = Router();

router.get('/', ForumController.findAll);
router.get('/:id', ForumController.findOne);
router.post('/', ForumController.create);
router.put('/:id', ForumController.update);
router.delete('/:id', ForumController.delete);

export default router;
