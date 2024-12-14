import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class Notification extends Model {}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        patient_id: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        },
        recipient_type: {
            type: DataTypes.STRING(256), // 'user' or 'patient'
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        notification_type: {
            type: DataTypes.STRING(256), // 'email', 'sms', 'app'
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(256), // 'pending', 'sent', 'failed'
            allowNull: false,
        },
        sent_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'notification',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default Notification;
