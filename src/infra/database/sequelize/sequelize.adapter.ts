import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { initModels } from './models';
import { seedCommentModel } from './seeders/comment-seeder';
import { seedTopicModel } from './seeders/topic-seeder';
import { seedUserModels } from './seeders/user-seeder';
import { seedVehicleModels } from './seeders/vehicle-seeder';

dotenv.config();

class SequelizeAdapter {
    public instance: Sequelize;
    public models: ReturnType<typeof initModels>;

    constructor() {
        this.instance = new Sequelize({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            logging: false,
        });

        this.models = initModels(this.instance);
    }
    async connect(forceSync = false) {
        try {
            await this.instance.authenticate();
            console.log('✅ Conectado ao banco com Sequelize');
            await this.instance.sync({ force: forceSync });
            console.log('📦 Models sincronizados com sucesso');

            if (forceSync) {
                seedVehicleModels(this.instance);
                seedUserModels(this.instance);
                seedTopicModel(this.instance);
                seedCommentModel(this.instance);
            }
        } catch (error) {
            console.error('❌ Erro na conexão com o banco de dados:', error);
        }
    }
}

export default new SequelizeAdapter();
