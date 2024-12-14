import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class TestParameter extends Model {}

TestParameter.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        template_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parameter_name: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        normal_range: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        allowed_range: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
    },
    {
        tableName: 'test_parameter',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default TestParameter;
