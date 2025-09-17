import bcrypt from 'bcrypt';
import seedData from './user-seed.json';

export async function seedUserModels(sequelize: any) {
    const now = new Date();
    const passwordHash = await bcrypt.hash('password123', 10);

    for (const user of seedData) {
        await sequelize.models.UserModel.create({
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            passwordHash,
            bio: user.bio,
            imageUrl: user.imageUrl,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        });

        console.log(`✅ Usuário inserido: ${user.username}`);
    }

    console.log('👤 Seed de usuários inseridos com sucesso!');
}
