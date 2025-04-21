import { Router } from 'express';
import TopicController from '../controllers/topic.controller';

const router = Router();

router.get('/', TopicController.findAll);
router.get('/:id', TopicController.findOne);
router.post('/', TopicController.create);
router.put('/:id', TopicController.update);
router.delete('/:id', TopicController.delete);

export default router;
