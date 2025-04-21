import { FindVehicleSpecByVehicleIdUseCase } from '@/application/usecases/find-vehicle-spec-by-vehicle-id.usecase';
import { VehicleSpecRepository } from '@/infra/database/sequelize/repositories/vehicle-spec.repository';
import { Request, Response } from 'express';

const repo = new VehicleSpecRepository();

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

async function findByVehicleId(req: Request, res: Response) {
    const vehicleId = req.params.vehicleId;

    if (!vehicleId) {
        return res.status(400).json({ error: 'vehicleId param is required' });
    }

    const useCase = new FindVehicleSpecByVehicleIdUseCase(repo);
    const spec = await useCase.execute(vehicleId);

    if (!spec) {
        return res.status(404).json({ error: 'Vehicle specs not found' });
    }

    return res.status(200).json(spec);
}

export default {
    findAll,
    findByVehicleId,
    findOne,
    create,
    update,
    delete: remove,
};
