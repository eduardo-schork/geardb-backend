import { TUserVehicleEntity } from '@/domain/entities/user-vehicle.entity';
import { TUserVehicleRepository } from '@/domain/repositories/user-vehicle-repository.type';

export class GetUserVehiclesUseCase {
    constructor(private userVehicleRepository: TUserVehicleRepository) {}

    async execute(userId: string): Promise<TUserVehicleEntity[]> {
        return this.userVehicleRepository.findByUserId(userId);
    }
}
