import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class Patient extends Model {}

Patient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(10), // 'male', 'female', or 'other'
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
    },
    {
        tableName: 'patient',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default Patient;