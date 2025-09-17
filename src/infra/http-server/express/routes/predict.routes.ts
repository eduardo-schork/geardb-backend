import { Router } from 'express';
import multer from 'multer';
import PredictController from '../controllers/predict.controller';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), PredictController.predict);

export default router;
