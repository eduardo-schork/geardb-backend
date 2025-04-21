import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Importando os models definidos com `sequelize.define`
import defineCommentLikeModel from './models/comment-like.model';
import defineCommentModel from './models/comment.model';
import defineFipePriceModel from './models/fipe-price.model';
import defineForumModel from './models/forum.model';
import defineMediaModel from './models/media.model';
import defineSessionModel from './models/session.model';
import defineTopicLikeModel from './models/topic-like.model';
import defineTopicModel from './models/topic.model';
import defineUserFollowModel from './models/user-follow.model';
import defineUserVehicleModel from './models/user-vehicle.model';
import defineUserModel from './models/user.model';
import defineVehicleSpecModel from './models/vehicle-spec.model';
import defineVehicleModel from './models/vehicle.model';
import { seedVehicleModels } from './seeders/vehicle.seed';

dotenv.config();

class SequelizeAdapter {
    public instance: Sequelize;

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
    }

    async connect(forceSync: boolean = false) {
        defineUserModel(this.instance);
        defineUserFollowModel(this.instance);
        defineSessionModel(this.instance);
        defineForumModel(this.instance);
        defineTopicModel(this.instance);
        defineTopicLikeModel(this.instance);
        defineCommentModel(this.instance);
        defineCommentLikeModel(this.instance);
        defineVehicleModel(this.instance);
        defineVehicleSpecModel(this.instance);
        defineFipePriceModel(this.instance);
        defineUserVehicleModel(this.instance);
        defineMediaModel(this.instance);

        try {
            await this.instance.authenticate();
            console.log('✅ Conectado ao banco com Sequelize');
            await this.instance.sync({ force: forceSync });
            console.log('📦 Models sincronizados com sucesso');

            if (forceSync) {
                await seedVehicleModels(this.instance);
            }
        } catch (error) {
            console.error('❌ Erro na conexão com o banco de dados:', error);
        }
    }
}

export default new SequelizeAdapter();
