import { Router } from 'express';
import FipePriceController from '../controllers/fipe-price.controller';

const router = Router();

router.get('/', FipePriceController.findAll);
router.get('/:id', FipePriceController.findOne);
router.post('/', FipePriceController.create);
router.put('/:id', FipePriceController.update);
router.delete('/:id', FipePriceController.delete);

router.get('/vehicle/:id', FipePriceController.getByVehicleId);

export default router;
