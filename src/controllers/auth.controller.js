const db = require("../config/database");
const {loginSchema} = require("./requests/auth.request");
const {validateMD5Password, generateToken} = require("../libs/common");
const UserModel = db.UserModel;
const generateAuth = async (req, res) => {
    const {error, value} = loginSchema.validate(req.body);
    if (error) return res.status(400).json({status: "error", message: error.message});

    UserModel.findOne({ where: { email: value.email} })
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({status: "error", error: 'Invalid email or password'});
            }

            const compare = validateMD5Password(value.password, user.password);
            if (compare) {
                await user.update({token: generateToken()})
                return res.status(200).json({status: "success", token: user.token});
            } else return res.status(401).json({status: "error", message: 'Invalid email or password'});
        })
        .catch((error) => {
            return res.status(500).json({ status: "error", message: error.message });
        });
}

module.exports = {
    generateAuth
}