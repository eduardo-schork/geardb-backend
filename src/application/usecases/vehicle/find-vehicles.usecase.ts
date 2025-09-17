import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { TVehicleRepository } from '@/domain/repositories/vehicle-repository.type';

type FindVehiclesInput = {
    brand?: string;
    model?: string;
    version?: string;
    year?: number;
};

export class FindVehiclesUseCase {
    constructor(private vehicleRepo: TVehicleRepository) {}

    async execute(filters: FindVehiclesInput): Promise<TVehicleEntity[]> {
        return this.vehicleRepo.findMany(filters);
    }
}
