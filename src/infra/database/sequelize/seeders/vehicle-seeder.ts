import { v4 as uuidv4 } from 'uuid';
import seedData from './vehicle-seed.json';

export async function seedVehicleModels(sequelize: any) {
    const now = new Date();

    for (const [_, [vehicle, specs]] of Object.entries(seedData)) {
        const vehicleId = uuidv4();

        await sequelize.models.VehicleModel.create({
            id: vehicleId,
            brand: vehicle.brand,
            model: vehicle.model,
            version: vehicle.version,
            year: vehicle.year,
            label: vehicle.label,
            imageUrl: vehicle.imageUrl,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        });

        await sequelize.models.VehicleSpecModel.create({
            id: uuidv4(),
            vehicleId,
            ...specs,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        });

        console.log(`✅ Veículo inserido: ${vehicle.label}`);
    }

    console.log('🚗 Seed de veículos inseridos com sucesso!');
}
