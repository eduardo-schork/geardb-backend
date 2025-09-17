import { TFipePriceEntity } from '@/domain/entities/fipe-price.entity';
import { TVehicleEntity } from '@/domain/entities/vehicle.entity';
import { TFipePriceRepository } from '@/domain/repositories/fipe-price.repository';
import { TVehicleRepository } from '@/domain/repositories/vehicle-repository.type';
import { FipePriceServicePort } from '@/infra/fipe-price-service/fipe-price-service.port';
import { v4 as uuidv4 } from 'uuid';

export class GetFipePriceByVehicleIdUseCase {
    constructor(
        private readonly fipeService: FipePriceServicePort,
        private readonly vehicleRepository: TVehicleRepository,
        private readonly fipePriceRepository: TFipePriceRepository,
    ) {}

    async execute(vehicleId: string): Promise<{
        vehicle: TVehicleEntity;
        fipePrice: TFipePriceEntity;
    }> {
        if (!vehicleId) {
            throw new Error('VehicleId é obrigatório.');
        }

        const vehicle = await this.vehicleRepository.findById(vehicleId);

        if (!vehicle) {
            throw new Error('Veículo não encontrado.');
        }

        const fipeCode = `MOCK-${vehicle.id}`;
        const result = await this.fipeService.getPriceByFipeCodeAndYear(
            fipeCode,
            vehicle.year.toString(),
        );

        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const referenceMonth = `${month}/${now.getFullYear()}`;

        const entity: TFipePriceEntity = {
            id: uuidv4(),
            vehicleId: vehicle.id,
            price: parseFloat(
                result.preco.replace('R$ ', '').replace('.', '').replace(',', '.'),
            ),
            referenceMonth,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };

        const fipePrice = await this.fipePriceRepository.create(entity);

        return {
            vehicle,
            fipePrice,
        };
    }
}
