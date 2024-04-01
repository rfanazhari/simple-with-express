const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const configSchema = Joi.object({
    PORT: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
}).unknown();

const {error, value: config} = configSchema.validate(process.env);
if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

const serverConfig = {
    port: config.PORT,
    database: {
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
    }
};

module.exports = serverConfig;