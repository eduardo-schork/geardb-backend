import { Router } from 'express';
import TopicLikeController from '../controllers/topic-like.controller';

const router = Router();

router.get('/', TopicLikeController.findAll);
router.get('/:id', TopicLikeController.findOne);
router.post('/', TopicLikeController.create);
router.put('/:id', TopicLikeController.update);
router.delete('/:id', TopicLikeController.delete);

export default router;
