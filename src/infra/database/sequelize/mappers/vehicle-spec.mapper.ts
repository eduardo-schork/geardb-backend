import {
    TVehicleSpecEntity,
    TVehicleSpecEntity as VehicleSpecAttributes,
} from '@/domain/entities/vehicle-spec.entity';
import { Model } from 'sequelize';

export function toVehicleSpecEntity(
    model: Model<VehicleSpecAttributes>,
): TVehicleSpecEntity {
    const data = model.get() as Required<VehicleSpecAttributes>;

    return {
        id: data.id,
        vehicleId: data.vehicleId,

        engine: data.engine,
        engineLayout: data.engineLayout,
        valves: data.valves,
        fuelInjection: data.fuelInjection,
        enginePosition: data.enginePosition,
        fuelType: data.fuelType,
        power: data.power,
        torque: data.torque,
        displacement: data.displacement,
        steering: data.steering,
        drivetrain: data.drivetrain,
        transmission: data.transmission,

        maxSpeedKmH: data.maxSpeedKmH,
        acceleration0to100: data.acceleration0to100,
        consumptionCity: data.consumptionCity,
        consumptionHighway: data.consumptionHighway,

        frontSuspension: data.frontSuspension,
        rearSuspension: data.rearSuspension,
        frontBrakes: data.frontBrakes,
        rearBrakes: data.rearBrakes,
        wheels: data.wheels,
        tires: data.tires,

        lengthMM: data.lengthMM,
        wheelbaseMM: data.wheelbaseMM,
        heightMM: data.heightMM,
        widthMM: data.widthMM,
        curbWeightKg: data.curbWeightKg,
        trunkCapacityL: data.trunkCapacityL,
        tankCapacityL: data.tankCapacityL,
        payloadKg: data.payloadKg,

        doors: data.doors,
        seats: data.seats,

        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
    };
}
