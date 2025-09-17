import { TVehicleSpecEntity } from '@/domain/entities/vehicle-spec.entity';
import { DataTypes, Model, Sequelize } from 'sequelize';

export default function defineVehicleSpecModel(sequelize: Sequelize) {
    return sequelize.define<Model<TVehicleSpecEntity>>(
        'VehicleSpecModel',
        {
            vehicleId: { type: DataTypes.UUID, allowNull: false },

            engine: { type: DataTypes.STRING, allowNull: true },
            engineLayout: { type: DataTypes.STRING, allowNull: true },
            valves: { type: DataTypes.STRING, allowNull: true },
            fuelInjection: { type: DataTypes.STRING, allowNull: true },
            enginePosition: { type: DataTypes.STRING, allowNull: true },
            fuelType: { type: DataTypes.STRING, allowNull: true },
            power: { type: DataTypes.STRING, allowNull: true },
            torque: { type: DataTypes.STRING, allowNull: true },
            displacement: { type: DataTypes.STRING, allowNull: true },
            steering: { type: DataTypes.STRING, allowNull: true },
            drivetrain: { type: DataTypes.STRING, allowNull: true },
            transmission: { type: DataTypes.STRING, allowNull: true },

            maxSpeedKmH: { type: DataTypes.STRING, allowNull: true },
            acceleration0to100: { type: DataTypes.STRING, allowNull: true },
            consumptionCity: { type: DataTypes.STRING, allowNull: true },
            consumptionHighway: { type: DataTypes.STRING, allowNull: true },

            frontSuspension: { type: DataTypes.STRING, allowNull: true },
            rearSuspension: { type: DataTypes.STRING, allowNull: true },
            frontBrakes: { type: DataTypes.STRING, allowNull: true },
            rearBrakes: { type: DataTypes.STRING, allowNull: true },
            wheels: { type: DataTypes.STRING, allowNull: true },
            tires: { type: DataTypes.STRING, allowNull: true },

            lengthMM: { type: DataTypes.STRING, allowNull: true },
            wheelbaseMM: { type: DataTypes.STRING, allowNull: true },
            heightMM: { type: DataTypes.STRING, allowNull: true },
            widthMM: { type: DataTypes.STRING, allowNull: true },
            curbWeightKg: { type: DataTypes.STRING, allowNull: true },
            trunkCapacityL: { type: DataTypes.STRING, allowNull: true },
            tankCapacityL: { type: DataTypes.STRING, allowNull: true },
            payloadKg: { type: DataTypes.STRING, allowNull: true },

            doors: { type: DataTypes.INTEGER, allowNull: true },
            seats: { type: DataTypes.INTEGER, allowNull: true },

            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            deletedAt: { type: DataTypes.DATE, allowNull: true },
        },
        {
            tableName: 'vehicle_spec',
            timestamps: false,
        },
    );
}
