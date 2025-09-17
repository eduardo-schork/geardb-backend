import { Router } from 'express';
import CommentLikeController from '../controllers/comment-like.controller';

const router = Router();

router.get('/', CommentLikeController.findAll);
router.get('/:id', CommentLikeController.findOne);
router.post('/', CommentLikeController.create);
router.put('/:id', CommentLikeController.update);
router.delete('/:id', CommentLikeController.delete);

export default router;
