import { CreateUserUseCase } from '@/application/usecases/create-user.usecase';
import { UpdateUserUseCase } from '@/application/usecases/update-user.usecase';
import { FindUserByIdUseCase } from '@/application/usecases/user/find-user-by-id.usecase';
import { UserFollowRepository } from '@/infra/database/sequelize/repositories/user-follow.repository';
import { UserRepository } from '@/infra/database/sequelize/repositories/user.repository';
import FileStoragePort from '@/infra/file-storage/file-storage.port';
import { Request, Response } from 'express';

const userRepository = new UserRepository();
const userFollowRepository = new UserFollowRepository();
const fileStorageAdapter = FileStoragePort;

const createUserUseCase = new CreateUserUseCase(userRepository, fileStorageAdapter);
const updateUserUseCase = new UpdateUserUseCase(userRepository, fileStorageAdapter);

async function findAll(req: Request, res: Response) {
    const result = await userRepository.findAll();
    return res.status(200).json(result);
}

async function findOne(req: Request, res: Response) {
    const requesterUserId = req.user?.userId;
    const { id: targetUserId } = req.params;

    if (!targetUserId || !requesterUserId) {
        return res.status(400).json({ error: 'Parâmetros inválidos.' });
    }

    try {
        const usecase = new FindUserByIdUseCase(userRepository, userFollowRepository);

        const result = await usecase.execute(targetUserId, requesterUserId);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

async function create(req: Request, res: Response) {
    const { username, name, email, passwordHash, bio } = req.body;

    const profileImage = req.file
        ? {
              filename: req.file.originalname,
              buffer: req.file.buffer,
              mimetype: req.file.mimetype,
          }
        : undefined;

    const created = await createUserUseCase.execute({
        username,
        name,
        email,
        passwordHash,
        bio,
        profileImage,
    });

    return res.status(201).json(created);
}

async function update(req: Request, res: Response) {
    const { username, name, email, passwordHash, bio } = req.body;
    const { id } = req.params;

    const profileImage = req.file
        ? {
              filename: req.file.originalname,
              buffer: req.file.buffer,
              mimetype: req.file.mimetype,
          }
        : undefined;

    const updated = await updateUserUseCase.execute(id, {
        username,
        name,
        email,
        passwordHash,
        bio,
        profileImage,
    });

    return res.status(200).json(updated);
}

async function remove(req: Request, res: Response) {
    const ok = await userRepository.delete(req.params.id);
    if (!ok) return res.status(404).send('Not found');
    return res.status(200).send('Deleted');
}

export default {
    findAll,
    findOne,
    create,
    update,
    delete: remove,
};
