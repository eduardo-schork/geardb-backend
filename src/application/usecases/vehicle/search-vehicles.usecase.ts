import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { VehicleRepository } from '@/infra/database/sequelize/repositories/vehicle.repository';

export class SearchVehiclesUseCase {
    constructor(private readonly vehicleRepository: VehicleRepository) {}

    async execute(query: string): Promise<TVehicleEntity[]> {
        if (!query || query.trim().length === 0) {
            throw new Error('A busca não pode estar vazia.');
        }

        return await this.vehicleRepository.searchByQuery(query.trim());
    }
}
