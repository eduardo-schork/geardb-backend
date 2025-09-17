import { TVehicleSpecEntity } from '@/domain/entities/vehicle-spec.entity';
import { TVehicleSpecRepository } from '@/domain/repositories/vehicle-spec-repository.type';

export class FindVehicleSpecByVehicleIdUseCase {
    constructor(private vehicleSpecRepo: TVehicleSpecRepository) {}

    async execute(vehicleId: string): Promise<TVehicleSpecEntity | null> {
        return await this.vehicleSpecRepo.findByVehicleId(vehicleId);
    }
}
