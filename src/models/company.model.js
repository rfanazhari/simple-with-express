const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');

module.exports = (sequelize) => {
    const CompanyModel = sequelize.define('Company', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        company_name: {
            type: DataTypes.STRING(55),
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'company',
        timestamps: false,
        collate: 'utf8mb4_general_ci',
        engine: 'InnoDB'
    });

    // Hook before saving
    CompanyModel.beforeCreate(async (user) => {
        user.createdAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    });

    // Hook before update
    CompanyModel.beforeUpdate(async (user) => {
        user.updatedAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    });
    return CompanyModel;
};
