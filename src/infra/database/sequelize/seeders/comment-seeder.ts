import seedData from './comment-seed.json';

export async function seedCommentModel(sequelize: any) {
    const now = new Date();

    for (const comment of seedData) {
        await sequelize.models.CommentModel.create({
            id: comment.id,
            topicId: comment.topicId,
            userId: comment.userId,
            content: comment.content,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        });

        console.log(`💬 Comentário criado para tópico ${comment.topicId}`);
    }

    console.log('💬✅ Seed de comentários inserido com sucesso!');
}
