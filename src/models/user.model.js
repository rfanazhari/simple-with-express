const {DataTypes} = require("sequelize");
const {generateToken, generateMD5Password} = require("../libs/common");
const moment = require('moment-timezone');

module.exports = (sequelize) => {
    const UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        tableName: 'users',
        timestamps: true,
        engine: 'InnoDB',
        charset: 'latin1',
        collate: 'latin1_swedish_ci',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    // Hook before saving
    UserModel.beforeCreate(async (user) => {
        user.password = generateMD5Password(user?.password);
        user.token = generateToken();
        user.createdAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    });

    // Hook before update
    UserModel.beforeUpdate(async (user) => {
        user.updatedAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    });

    return UserModel;
}