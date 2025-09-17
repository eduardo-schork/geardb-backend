import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { TUserVehicleRepository } from '@/domain/repositories/user-vehicle-repository.type';

export class FindUserVehiclesByUserIdUseCase {
    constructor(private readonly userVehicleRepo: TUserVehicleRepository) {}

    async execute(userId: string): Promise<TUserVehicleEntity[]> {
        const result = await this.userVehicleRepo.findByUserId(userId);
        return result;
    }
}
