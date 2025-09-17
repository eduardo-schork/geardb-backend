import { UserFollowRepository } from '@/infra/database/sequelize/repositories/user-follow.repository';
import { Request, Response } from 'express';

const repo = new UserFollowRepository();

async function findAll(req: Request, res: Response) {
    const result = await repo.findAll();
    return res.status(200).json(result);
}

async function findOne(req: Request, res: Response) {
    const item = await repo.findById(req.params.id);
    if (!item) return res.status(404).send('Not found');
    return res.status(200).json(item);
}

async function create(req: Request & { user: { userId: string } }, res: Response) {
    const userId = req.user?.userId;
    const { followingId } = req.body;

    if (!userId || !followingId) {
        return res.status(400).json({ error: 'userId e followingId são obrigatórios.' });
    }

    const created = await repo.create({ userId, followingId });
    return res.status(201).json(created);
}

async function update(req: Request, res: Response) {
    const updated = await repo.update(req.params.id, req.body);
    if (!updated) return res.status(404).send('Not found');
    return res.status(200).json(updated);
}

async function remove(req: Request & { user: { userId: string } }, res: Response) {
    const userId = req.user?.userId;
    const followingId = req.params.id;

    if (!userId || !followingId) {
        return res.status(400).json({ error: 'userId e followingId são obrigatórios.' });
    }

    const ok = await repo.delete(followingId, userId);
    if (!ok) return res.status(404).send('Not found');
    return res.status(200).send('Deleted');
}

const UserFollowController = {
    findAll,
    findOne,
    create,
    update,
    delete: remove,
};

export default UserFollowController;
