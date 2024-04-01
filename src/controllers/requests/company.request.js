const Joi = require("joi");

const companyCreateSchema = Joi.object({
    company_name: Joi.string().required(),
});

const companyUpdateSchema = Joi.object({
    company_name: Joi.string().optional(),
});


module.exports = {
    companyCreateSchema,
    companyUpdateSchema
}