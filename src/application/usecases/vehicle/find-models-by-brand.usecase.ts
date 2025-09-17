import { TVehicleRepository } from '@/domain/repositories/vehicle-repository.type';

export class FindModelsByBrandUseCase {
    constructor(private readonly vehicleRepo: TVehicleRepository) {}

    async execute(brand: string): Promise<string[]> {
        return this.vehicleRepo.findModelsByBrand(brand);
    }
}
