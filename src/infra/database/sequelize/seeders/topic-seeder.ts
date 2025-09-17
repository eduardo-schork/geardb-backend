import { v4 as uuidv4 } from 'uuid';
import seedData from './topic-seed.json';

export async function seedTopicModel(sequelize: any) {
    const now = new Date();

    for (const topic of seedData) {
        await sequelize.models.TopicModel.create({
            id: topic.id || uuidv4(),
            forumId: topic.forumId,
            userId: topic.userId,
            title: topic.title,
            content: topic.content,
            imageUrl: topic?.imageUrl,
            views: topic.views,
            createdAt: topic.createdAt || now,
            updatedAt: topic.updatedAt || now,
            deletedAt: topic.deletedAt ?? null,
        });

        console.log(`✅ Tópico inserido: ${topic.title}`);
    }

    console.log('📚 Seed de tópicos inseridos com sucesso!');
}
