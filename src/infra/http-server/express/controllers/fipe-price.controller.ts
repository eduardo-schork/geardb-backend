import { GetFipePriceByVehicleIdUseCase } from '@/application/usecases/get-fipe-price.usecase';
import { FipePriceRepository } from '@/infra/database/sequelize/repositories/fipe-price.repository';
import { VehicleRepository } from '@/infra/database/sequelize/repositories/vehicle.repository';
import FipePriceServicePort from '@/infra/fipe-price-service/fipe-price-service.port';
import { Request, Response } from 'express';

const repo = new FipePriceRepository();
const vehicleRepository = new VehicleRepository();

const fipePricePort = FipePriceServicePort;

async function findAll(req: Request, res: Response) {
    const result = await repo.findAll();
    return res.status(200).json(result);
}

async function findOne(req: Request, res: Response) {
    const item = await repo.findById(req.params.id);
    if (!item) return res.status(404).send('Not found');
    return res.status(200).json(item);
}

async function create(req: Request, res: Response) {
    const created = await repo.create(req.body);
    return res.status(201).json(created);
}

async function update(req: Request, res: Response) {
    const updated = await repo.update(req.params.id, req.body);
    if (!updated) return res.status(404).send('Not found');
    return res.status(200).json(updated);
}

async function remove(req: Request, res: Response) {
    const ok = await repo.delete(req.params.id);
    if (!ok) return res.status(404).send('Not found');
    return res.status(200).send('Deleted');
}

async function getByVehicleId(req: Request, res: Response) {
    const vehicleId = req.params.id;

    if (!vehicleId) {
        return res.status(400).json({ error: 'Parâmetro vehicleId é obrigatório.' });
    }

    try {
        const usecase = new GetFipePriceByVehicleIdUseCase(
            fipePricePort,
            vehicleRepository,
            repo,
        );

        const result = await usecase.execute(vehicleId);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    delete: remove,
    getByVehicleId,
};
