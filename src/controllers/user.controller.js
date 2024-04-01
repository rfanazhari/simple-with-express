const db = require("../config/database");
const {userCreateSchema} = require("./requests/user.request");
const {toDomainUser} = require("../models/mapper/user.mapper");
const UserModel = db.UserModel;

const createUser = async (req, res) => {
    const {error, value: dataUser} = userCreateSchema.validate(req.body);
    if (error) return res.status(400).json({status: "error", message: error.message});
    dataUser.fullname = dataUser.fullname.toLowerCase()

    const user = await UserModel.findOne({where: {email: dataUser.email}});

    if (user) return res.status(400).json({status: "error", message: "existing user"});
    UserModel.create(dataUser)
        .then((user) => {
            return res.status(200).json({status: "success", data: toDomainUser(user)});
        })
        .catch((error) => {
            return res.status(500).json({status: "error", message: error.message});
        });
}

module.exports = {
    createUser
}