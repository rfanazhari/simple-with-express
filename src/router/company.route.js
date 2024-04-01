const express = require('express')
const {middlewareLogin} = require("../libs/middleware");
const {listCompany, createCompany, updateCompany, deleteCompany} = require("../controllers/company.controller");
const companyRoute = express.Router();

companyRoute.get("/list",middlewareLogin, listCompany);
companyRoute.post("/insert",middlewareLogin, createCompany);
companyRoute.put("/:id",middlewareLogin, updateCompany);
companyRoute.delete("/:id",middlewareLogin, deleteCompany);

module.exports = companyRoute;