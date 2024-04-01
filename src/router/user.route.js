const express = require('express')
const {createUser} = require("../controllers/user.controller");
const {middlewareLogin} = require("../libs/middleware");
const userRouter = express.Router();

userRouter.post("/create",middlewareLogin, createUser);

module.exports = userRouter;