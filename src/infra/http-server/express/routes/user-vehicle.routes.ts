import { Router } from 'express';
import multer from 'multer';
import UserVehicleController from '../controllers/user-vehicle.controller';

const router = Router();
const upload = multer();

router.get('/', UserVehicleController.findAll);
router.get('/:id', UserVehicleController.findOne);
router.post('/', upload.single('image'), UserVehicleController.create);
router.put('/:id', UserVehicleController.update);
router.delete('/:id', UserVehicleController.delete);
router.get('/user/:userId', UserVehicleController.findByUserId);

export default router;
