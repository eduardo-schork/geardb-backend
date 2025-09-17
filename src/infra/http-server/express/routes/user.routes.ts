import { Router } from 'express';
import multer from 'multer';
import UserController from '../controllers/user.controller';

const router = Router();
const upload = multer();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', upload.single('profileImage'), UserController.create);
router.put('/:id', upload.single('profileImage'), UserController.update);
router.delete('/:id', UserController.delete);

export default router;
