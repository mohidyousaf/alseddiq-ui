import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class Visit extends Model {}

Visit.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        visit_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'visit',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default Visit;
