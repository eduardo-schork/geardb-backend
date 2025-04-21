import { Router } from 'express';
import VehicleSpecController from '../controllers/vehicle-spec.controller';

const router = Router();

router.get('/vehicle/:vehicleId', VehicleSpecController.findByVehicleId);
router.get('/', VehicleSpecController.findAll);
// router.get('/:id', VehicleSpecController.findOne);
router.post('/', VehicleSpecController.create);
router.put('/:id', VehicleSpecController.update);
router.delete('/:id', VehicleSpecController.delete);

export default router;
