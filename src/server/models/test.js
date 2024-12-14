import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../server/utils/db.js';

class Test extends Model {}

Test.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        test_id: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        test_name: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        sample_needed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        dept_name:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        type_of_specimen:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        conduct_in_report_format:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        status:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        service_group_name:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        service_sub_group_name:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        conduction_applicable:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        conducting_doctor_mandatory:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        mandate_additional_info:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        unit_charge:{
            type:DataTypes.DECIMAL,
            allowNull: true,
        },
        result_entry_applicable:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        alias:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        insurance_category:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        pre_auth_required:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        allow_rate_increase:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        allow_rate_decrease:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        interface_test_code:{
            type:DataTypes.STRING(256),
            allowNull: true,
        },
        dont_auto_share_result:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
        test_duration:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        prescribable:{
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: 'test',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize,
    }
);

export default Test;
