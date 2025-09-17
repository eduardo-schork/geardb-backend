import { Router } from 'express';
import multer from 'multer';
import TopicController from '../controllers/topic.controller';

const router = Router();
const upload = multer();

router.get('/', TopicController.findAll);
router.get('/:id', TopicController.findOne);
// router.post('/', TopicController.create);
router.post('/', upload.single('image'), TopicController.create);
router.put('/:id', TopicController.update);
router.delete('/:id', TopicController.delete);

export default router;
