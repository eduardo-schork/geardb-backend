import { FindVehiclesUseCase } from '@/application/usecases/find-vehicles.usecase';
import { VehicleRepository } from '@/infra/database/sequelize/repositories/vehicle.repository';
import { Request, Response } from 'express';

const repo = new VehicleRepository();

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

async function findManyFiltered(req: Request, res: Response) {
    try {
        const { brand, model, version, year } = req.query;

        const useCase = new FindVehiclesUseCase(repo);

        const vehicles = await useCase.execute({
            brand: brand?.toString(),
            model: model?.toString(),
            version: version?.toString(),
            year: year ? parseInt(year.toString(), 10) : undefined,
        });

        return res.status(200).json(vehicles);
    } catch (error) {
        console.error('❌ Erro ao buscar veículos:', error);
        return res.status(500).json({ message: 'Erro ao buscar veículos' });
    }
}

export default {
    findAll,
    findOne,
    findManyFiltered,
    create,
    update,
    delete: remove,
};
