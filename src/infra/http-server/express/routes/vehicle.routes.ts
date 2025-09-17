import { Router } from 'express';
import VehicleController from '../controllers/vehicle.controller';

const router = Router();

router.get('/brands', VehicleController.findAllBrands);
router.get('/models', VehicleController.findModelsByBrand);
router.get('/versions', VehicleController.findVersionsByBrandAndModel);

router.get('/', VehicleController.findManyFiltered);
// router.get('/', VehicleController.findAll);
router.get('/:id', VehicleController.findOne);
router.post('/', VehicleController.create);
router.put('/:id', VehicleController.update);
router.delete('/:id', VehicleController.delete);

router.get('/search/:query', VehicleController.search);

export default router;
