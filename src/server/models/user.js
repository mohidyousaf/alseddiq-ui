import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(256), // 'admin' or 'technician'
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: 'user',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default User;
