const db = require("../config/database");
const {toListDomainCompany, toDomainCompany} = require("../models/mapper/company.mapper");
const {companyCreateSchema, companyUpdateSchema} = require("./requests/company.request");
const CompanyModel = db.CompanyModel;

const listCompany = (req, res) => {
    CompanyModel.findAll({where: {created_by: req.userId}})
        .then((companies) => {
            return res.status(200).json({status: "success", data: toListDomainCompany(companies)})
        })
        .catch((err) => {
            return res.status(500).json({status: "error", message: err.message});
        })
}

const createCompany = async (req, res) => {
    const {error, value: dataComp} = companyCreateSchema.validate(req.body);
    dataComp.company_name = dataComp.company_name.toLowerCase();
    dataComp.created_by = req.userId;
    dataComp.created_date = new Date();

    if (error) return res.status(400).json({status: "error", message: error.message});

    CompanyModel.create(dataComp)
        .then((comp) => {
            return res.status(200).json({status: "success", data: toDomainCompany(comp)});
        })
        .catch((error) => {
            return res.status(500).json({status: "error", message: error.message});
        });
}

const updateCompany = async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({status: "error", message: "required params"});
    const {error, value: dataCompany} = companyUpdateSchema.validate(req.body);
    dataCompany.company_name = dataCompany.company_name.toLowerCase()

    if (error) return res.status(400).json({status: "error", message: error.message});

    try {
        const company = await CompanyModel.findOne({where: {id: id, created_by: req.userId}});
        if (!company) return res.status(400).json({status: "error", message: `company ${id} not found`});
        await company.update({company_name: dataCompany.company_name ?? company.company_name});
        return res.status(200).json({status: "success", data: toDomainCompany(company)});
    } catch (e) {
        return res.status(500).json({status: "error", message: e.message});
    }
}

const deleteCompany = async (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({status: "error", message: "required params"});

    try {
        const company = await CompanyModel.findOne({where: {id: id, created_by: req.userId}});
        if (!company) return res.status(400).json({status: "error", message: `company ${id} not found`});
        await company.destroy();
        return res.status(200).json({status: "success", message: `Company id: ${id} from user ${req.userId} has been deleted`});
    } catch (e) {
        return res.status(500).json({status: "error", message: e.message});
    }
}

module.exports = {
    listCompany,
    createCompany,
    updateCompany,
    deleteCompany
}