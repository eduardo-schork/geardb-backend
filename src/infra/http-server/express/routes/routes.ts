import { RequestHandler, Router } from 'express';
import { authenticate } from '../auth.middleware';
import authRoutes from './auth.routes';
import comment_likeRoutes from './comment-like.routes';
import commentRoutes from './comment.routes';
import fipe_priceRoutes from './fipe-price.routes';
import forumRoutes from './forum.routes';
import mediaRoutes from './media.routes';
import predictRoutes from './predict.routes';
import sessionRoutes from './session.routes';
import topic_likeRoutes from './topic-like.routes';
import topicRoutes from './topic.routes';
import user_followRoutes from './user-follow.routes';
import user_vehicleRoutes from './user-vehicle.routes';
import userRoutes from './user.routes';
import vehicle_specRoutes from './vehicle-spec.routes';
import vehicleRoutes from './vehicle.routes';

const router = Router();

router.use('/predict', predictRoutes);
router.use('/user', authenticate as RequestHandler, userRoutes);
router.use('/user-follow', authenticate as RequestHandler, user_followRoutes);
router.use('/session', authenticate as RequestHandler, sessionRoutes);
router.use('/forum', authenticate as RequestHandler, forumRoutes);
router.use('/topic', authenticate as RequestHandler, topicRoutes);
router.use('/topic-like', authenticate as RequestHandler, topic_likeRoutes);
router.use('/comment', authenticate as RequestHandler, commentRoutes);
router.use('/comment-like', authenticate as RequestHandler, comment_likeRoutes);
router.use('/vehicle', authenticate as RequestHandler, vehicleRoutes);
router.use('/vehicle-spec', authenticate as RequestHandler, vehicle_specRoutes);
router.use('/fipe-price', authenticate as RequestHandler, fipe_priceRoutes);
router.use('/user-vehicle', authenticate as RequestHandler, user_vehicleRoutes);
router.use('/media', authenticate as RequestHandler, mediaRoutes);
router.use('/auth', authRoutes);

export default router;
