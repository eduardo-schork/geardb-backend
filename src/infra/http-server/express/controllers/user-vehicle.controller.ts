import { UserVehicleRepository } from '@/infra/database/sequelize/repositories/user-vehicle.repository';
import { Request, Response } from 'express';

import { CreateUserVehicleUseCase } from '@/application/usecases/create-user-vechicle.usecase';
import { VehicleRepository } from '@/infra/database/sequelize/repositories/vehicle.repository';
import FileStoragePort from '@/infra/file-storage/file-storage.port';

const userVehicleRepo = new UserVehicleRepository();
const vehicleRepo = new VehicleRepository();
const fileStorage = FileStoragePort;

const createUserVehicleUseCase = new CreateUserVehicleUseCase(
    vehicleRepo,
    userVehicleRepo,
    fileStorage,
);

async function findAll(req: Request, res: Response) {
    const result = await userVehicleRepo.findAll();
    return res.status(200).json(result);
}

async function findOne(req: Request, res: Response) {
    const item = await userVehicleRepo.findById(req.params.id);
    if (!item) return res.status(404).send('Not found');
    return res.status(200).json(item);
}

async function create(req: Request, res: Response) {
    try {
        const { userId, brand, model, version, year, nickname, notes, power, torque } =
            req.body;

        const image = req.file
            ? {
                  filename: req.file.originalname,
                  buffer: req.file.buffer,
                  mimetype: req.file.mimetype,
              }
            : undefined;

        if (!image) {
            return res.status(400).json({ error: 'Imagem é obrigatória' });
        }

        const result = await createUserVehicleUseCase.execute({
            userId,
            brand,
            model,
            version,
            year: Number(year),
            nickname,
            notes,
            power,
            torque,
            image,
        });

        return res.status(201).json(result);
    } catch (error: any) {
        console.error('❌ Erro ao criar veículo do usuário:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function update(req: Request, res: Response) {
    const updated = await userVehicleRepo.update(req.params.id, req.body);
    if (!updated) return res.status(404).send('Not found');
    return res.status(200).json(updated);
}

async function remove(req: Request, res: Response) {
    const ok = await userVehicleRepo.delete(req.params.id);
    if (!ok) return res.status(404).send('Not found');
    return res.status(200).send('Deleted');
}

async function findByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const items = await userVehicleRepo.findByUserId(userId);
    return res.status(200).json(items);
}

export default {
    findAll,
    findOne,
    create,
    update,
    delete: remove,
    findByUserId,
};
