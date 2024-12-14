import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class SampleCollection extends Model {}

SampleCollection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        test_instance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        technician_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        collection_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(256), // 'pending', 'collected', 'failed'
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'sample_collection',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default SampleCollection;
