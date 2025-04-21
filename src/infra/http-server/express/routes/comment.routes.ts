import { Request, Response, Router } from 'express';
import CommentController from '../controllers/comment.controller';

const router = Router();

router.get('/:commentId/replies', CommentController.getReplies); // <-- tem que vir antes
router.get('/:id', CommentController.findOne);
router.post('/', CommentController.create);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.delete);

router.get('/', (req: Request, res: Response) => {
    if (req.query.topicId) {
        return CommentController.findByTopicId(req, res);
    }
    return CommentController.findAll(req, res);
});

export default router;
