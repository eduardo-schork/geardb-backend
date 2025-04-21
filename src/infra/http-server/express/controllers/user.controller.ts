import { CreateUserUseCase } from '@/application/usecases/create-user.usecase';
import { UserRepository } from '@/infra/database/sequelize/repositories/user.repository';
import { Request, Response } from 'express';

const repo = new UserRepository();
const createUser = new CreateUserUseCase(repo);

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
    try {
        const result = await createUser.execute(req.body);
        return res.status(201).send(result);
    } catch (error) {
        console.error('❌ Erro ao criar usuário:', error);
        return res
            .status(500)
            .send({ message: 'Erro interno ao criar usuário' });
    }
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

export default {
    findAll,
    findOne,
    create,
    update,
    delete: remove,
};
