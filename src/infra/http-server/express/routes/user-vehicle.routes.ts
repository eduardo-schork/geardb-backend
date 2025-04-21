import { Router } from 'express';
import UserVehicleController from '../controllers/user-vehicle.controller';

const router = Router();

router.get('/', UserVehicleController.findAll);
router.get('/:id', UserVehicleController.findOne);
router.post('/', UserVehicleController.create);
router.put('/:id', UserVehicleController.update);
router.delete('/:id', UserVehicleController.delete);

export default router;
