import { FindCommentsByTopicIdUseCase } from '@/application/usecases/comment/find-comments-by-topic-id.usecase';
import { FindRepliesUseCase } from '@/application/usecases/comment/find-replies.use-case';
import { CommentRepository } from '@/infra/database/sequelize/repositories/comment.repository';
import { Request, Response } from 'express';

const repo = new CommentRepository();
const findRepliesUseCase = new FindRepliesUseCase(repo);

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

const findByTopicId = async (req: Request, res: Response) => {
    const topicId = req.query.topicId as string;

    if (!topicId) {
        return res.status(400).json({ error: 'topicId param is required' });
    }

    const useCase = new FindCommentsByTopicIdUseCase(repo);
    const comments = await useCase.execute(topicId);

    return res.status(200).json(comments);
};

async function getReplies(req: Request, res: Response) {
    try {
        const commentId = req.params.commentId;
        const replies = await findRepliesUseCase.execute(commentId);
        return res.status(200).json(replies);
    } catch (error) {
        console.error('❌ Erro ao buscar replies:', error);
        return res
            .status(500)
            .json({ message: 'Erro interno ao buscar replies' });
    }
}

export default {
    findAll,
    findByTopicId,
    findOne,
    create,
    getReplies,
    update,
    delete: remove,
};
