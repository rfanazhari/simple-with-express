const { Sequelize } = require("sequelize");
const config = require('../config/server');

// Create a Sequelize instance
const sequelize = new Sequelize({
    database: config.database.database,
    username: config.database.username,
    password: config.database.password,
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
    timezone: "+07:00"
});

const model = {};
model.Sequelize = Sequelize;
model.sequelize = sequelize;

model.UserModel = require("../models/user.model")(sequelize, Sequelize);
model.CompanyModel = require("../models/company.model")(sequelize, Sequelize);

module.exports = model;
