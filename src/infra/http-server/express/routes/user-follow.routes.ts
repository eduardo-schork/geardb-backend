import { Router } from 'express';
import UserFollowController from '../controllers/user-follow.controller';

const router = Router();

router.get('/', UserFollowController.findAll);
router.get('/:id', UserFollowController.findOne);
router.post('/', UserFollowController.create);
router.put('/:id', UserFollowController.update);
router.delete('/:id', UserFollowController.delete);

export default router;
