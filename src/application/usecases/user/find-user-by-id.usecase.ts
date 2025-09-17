import { TUserEntity } from '@/domain/entities/user.entity';
import { TUserFollowRepository } from '@/domain/repositories/user-follow.repository';
import { TUserRepository } from '@/domain/repositories/user-repository.type';

export class FindUserByIdUseCase {
    constructor(
        private readonly userRepository: TUserRepository,
        private readonly userFollowRepository: TUserFollowRepository,
    ) {}

    async execute(
        targetUserId: string,
        requesterUserId: string,
    ): Promise<{
        user: TUserEntity;
        followersCount: number;
        isFollowing: boolean;
    }> {
        const user = await this.userRepository.findById(targetUserId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const followers = await this.userFollowRepository.findByFollowingId(targetUserId);
        const followersCount = followers.length;

        const isFollowing = followers.some((f) => f.followerId === requesterUserId);

        return {
            ...user,
            followersCount,
            isFollowing,
        };
    }
}
