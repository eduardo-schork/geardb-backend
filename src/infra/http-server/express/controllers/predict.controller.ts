import { PredictVehicleUseCase } from '@/application/usecases/predict-vehicle.usecase';
import { VehicleRepository } from '@/infra/database/sequelize/repositories/vehicle.repository';
import { Request, Response } from 'express';

const vehicleRepo = new VehicleRepository();

export const predict = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Arquivo não enviado' });
    }

    const usecase = new PredictVehicleUseCase(vehicleRepo);

    const predictions = await usecase.execute({
        buffer: req.file.buffer,
        originalName: req.file.originalname,
    });

    return res.status(200).json(predictions);
};

export default {
    predict,
};
