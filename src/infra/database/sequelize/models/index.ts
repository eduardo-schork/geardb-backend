import { Sequelize } from 'sequelize';

import defineCommentLikeModel from './comment-like.model';
import defineCommentModel from './comment.model';
import defineFipePriceModel from './fipe-price.model';
import defineForumModel from './forum.model';
import defineMediaModel from './media.model';
import defineSessionModel from './session.model';
import defineTopicLikeModel from './topic-like.model';
import defineTopicModel from './topic.model';
import defineUserFollowModel from './user-follow.model';
import defineUserVehicleModel from './user-vehicle.model';
import defineUserModel from './user.model';
import defineVehicleSpecModel from './vehicle-spec.model';
import defineVehicleModel from './vehicle.model';

export function initModels(instance: Sequelize) {
    const UserModel = defineUserModel(instance);
    const UserFollowModel = defineUserFollowModel(instance);
    const SessionModel = defineSessionModel(instance);
    const ForumModel = defineForumModel(instance);
    const TopicModel = defineTopicModel(instance);
    const TopicLikeModel = defineTopicLikeModel(instance);
    const CommentModel = defineCommentModel(instance);
    const CommentLikeModel = defineCommentLikeModel(instance);
    const VehicleModel = defineVehicleModel(instance);
    const VehicleSpecModel = defineVehicleSpecModel(instance);
    const FipePriceModel = defineFipePriceModel(instance);
    const UserVehicleModel = defineUserVehicleModel(instance);
    const MediaModel = defineMediaModel(instance);

    TopicModel.belongsTo(ForumModel, { foreignKey: 'forumId', as: 'forum' });
    ForumModel.hasMany(TopicModel, { foreignKey: 'forumId', as: 'topics' });

    SessionModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
    UserModel.hasMany(SessionModel, { foreignKey: 'userId', as: 'sessions' });

    TopicLikeModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });
    TopicLikeModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
    TopicModel.hasMany(TopicLikeModel, { foreignKey: 'topicId', as: 'likes' });
    UserModel.hasMany(TopicLikeModel, { foreignKey: 'userId', as: 'givenTopicLikes' });

    CommentLikeModel.belongsTo(CommentModel, { foreignKey: 'commentId', as: 'comment' });
    CommentLikeModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
    CommentModel.hasMany(CommentLikeModel, { foreignKey: 'commentId', as: 'likes' });
    UserModel.hasMany(CommentLikeModel, {
        foreignKey: 'userId',
        as: 'givenCommentLikes',
    });

    UserFollowModel.belongsTo(UserModel, { foreignKey: 'followerId', as: 'follower' });
    UserFollowModel.belongsTo(UserModel, { foreignKey: 'followingId', as: 'following' });
    UserModel.hasMany(UserFollowModel, { foreignKey: 'followerId', as: 'followings' });
    UserModel.hasMany(UserFollowModel, { foreignKey: 'followingId', as: 'followers' });

    VehicleSpecModel.belongsTo(VehicleModel, { foreignKey: 'vehicleId', as: 'vehicle' });
    VehicleModel.hasOne(VehicleSpecModel, { foreignKey: 'vehicleId', as: 'spec' });

    FipePriceModel.belongsTo(VehicleModel, { foreignKey: 'vehicleId', as: 'vehicle' });
    VehicleModel.hasMany(FipePriceModel, { foreignKey: 'vehicleId', as: 'fipePrices' });

    // COMMENT
    CommentModel.belongsTo(TopicModel, {
        foreignKey: 'topicId',
        as: 'topic',
    });
    TopicModel.hasMany(CommentModel, {
        foreignKey: 'topicId',
        as: 'comments',
    });

    CommentModel.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'author',
    });
    UserModel.hasMany(CommentModel, {
        foreignKey: 'userId',
        as: 'comments',
    });

    CommentModel.belongsTo(CommentModel, {
        foreignKey: 'parentCommentId',
        as: 'parentComment',
        constraints: false,
    });
    CommentModel.hasMany(CommentModel, {
        foreignKey: 'parentCommentId',
        as: 'replies',
        constraints: false,
    });

    // TOPIC
    TopicModel.belongsTo(UserModel, {
        foreignKey: 'userId',
        as: 'author',
    });

    UserModel.hasMany(TopicModel, {
        foreignKey: 'userId',
        as: 'topics',
    });

    // USER VEHICLE
    UserVehicleModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
    UserVehicleModel.belongsTo(VehicleModel, {
        foreignKey: 'vehicleId',
        as: 'vehicle',
    });

    UserModel.hasMany(UserVehicleModel, { foreignKey: 'userId', as: 'userVehicles' });
    VehicleModel.hasMany(UserVehicleModel, {
        foreignKey: 'vehicleId',
        as: 'userVehicles',
    });

    return {
        UserModel,
        UserFollowModel,
        SessionModel,
        ForumModel,
        TopicModel,
        TopicLikeModel,
        CommentModel,
        CommentLikeModel,
        VehicleModel,
        VehicleSpecModel,
        FipePriceModel,
        UserVehicleModel,
        MediaModel,
    };
}
