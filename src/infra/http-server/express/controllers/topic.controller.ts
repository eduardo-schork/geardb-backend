import { CreateTopicUseCase } from '@/application/usecases/create-topic.usecase';
import { TopicRepository } from '@/infra/database/sequelize/repositories/topic.repository';
import FileStoragePort from '@/infra/file-storage/file-storage.port';
import { Request, Response } from 'express';

const topicRepo = new TopicRepository();
const fileStorage = FileStoragePort;

const createTopicUseCase = new CreateTopicUseCase(topicRepo, fileStorage);

async function findAll(req: Request & { user: { userId: string } }, res: Response) {
    const userId = req.user.userId;

    const result = await topicRepo.findAll({ userId });
    return res.status(200).json(result);
}

async function findOne(req: Request & { user: { userId: string } }, res: Response) {
    const userId = req.user.userId;
    const item = await topicRepo.findById({ id: req.params.id, userId });
    if (!item) return res.status(404).send('Not found');
    return res.status(200).json(item);
}

async function create(req: Request, res: Response) {
    try {
        const { forumId, userId, title, content } = req.body;

        const image = req.file
            ? {
                  filename: req.file.originalname,
                  buffer: req.file.buffer,
                  mimetype: req.file.mimetype,
              }
            : undefined;

        const created = await createTopicUseCase.execute({
            forumId,
            userId,
            title,
            content,
            image,
        });

        return res.status(201).json(created);
    } catch (error: any) {
        console.error('❌ Erro ao criar tópico:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function update(req: Request, res: Response) {
    const updated = await topicRepo.update(req.params.id, req.body);
    if (!updated) return res.status(404).send('Not found');
    return res.status(200).json(updated);
}

async function remove(req: Request, res: Response) {
    const ok = await topicRepo.delete(req.params.id);
    if (!ok) return res.status(404).send('Not found');
    return res.status(200).send('Deleted');
}

const TopicController = {
    findAll,
    findOne,
    create,
    update,
    delete: remove,
};

export default TopicController;
