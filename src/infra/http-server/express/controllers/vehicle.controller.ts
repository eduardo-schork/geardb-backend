import { FindAllBrandsUseCase } from '@/application/usecases/vehicle/find-all-brands.usecase';
import { FindModelsByBrandUseCase } from '@/application/usecases/vehicle/find-models-by-brand.usecase';
import { FindVehiclesUseCase } from '@/application/usecases/vehicle/find-vehicles.usecase';
import { FindVersionsByBrandAndModelUseCase } from '@/application/usecases/vehicle/find-versions-by-brand-and-model.usecase';
import { SearchVehiclesUseCase } from '@/application/usecases/vehicle/search-vehicles.usecase';
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

async function findAllBrands(req: Request, res: Response) {
    const useCase = new FindAllBrandsUseCase(repo);
    const brands = await useCase.execute();
    return res.status(200).json(brands);
}

async function findModelsByBrand(req: Request, res: Response) {
    const { brand } = req.query;

    if (!brand || typeof brand !== 'string') {
        return res.status(400).json({ message: 'Parâmetro "brand" é obrigatório.' });
    }

    const useCase = new FindModelsByBrandUseCase(repo);
    const models = await useCase.execute(brand);
    return res.status(200).json(models);
}

async function findVersionsByBrandAndModel(req: Request, res: Response) {
    const { brand, model } = req.query;

    if (!brand || !model || typeof brand !== 'string' || typeof model !== 'string') {
        return res.status(400).json({
            message: 'Parâmetros "brand" e "model" são obrigatórios.',
        });
    }

    const useCase = new FindVersionsByBrandAndModelUseCase(repo);
    const versions = await useCase.execute(brand, model);
    return res.status(200).json(versions);
}

async function search(req: Request, res: Response) {
    const query = req.params.query;

    if (!query) {
        return res.status(400).json({ error: 'Parâmetro "query" é obrigatório.' });
    }

    try {
        const usecase = new SearchVehiclesUseCase(repo);
        const result = await usecase.execute(query);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export default {
    findAll,
    findOne,
    findManyFiltered,
    create,
    update,
    delete: remove,

    findAllBrands,
    findModelsByBrand,
    findVersionsByBrandAndModel,
    search,
};
