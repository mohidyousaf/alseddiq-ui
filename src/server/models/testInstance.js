import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class TestInstance extends Model {}

TestInstance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        visit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        test_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        technician_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        approval_status: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        approved_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'test_instance',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default TestInstance;
