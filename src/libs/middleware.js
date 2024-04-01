const db = require("../config/database");
const UserModel = db.UserModel;
const middlewareLogin = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({status: "error", message: 'Authorization token not provided'});
    }

    try {
        const user = await UserModel.findOne({where: {token: token}});
        if (!user) return res.status(403).json({status: "error", message: 'Invalid authorization token'});
        req.userId = user.id;
        req.fullname = user?.fullname;
        req.token = token;
        req.email = user?.email;

        next();
    } catch (error) {
        return res.status(401).json({status: "error", message: 'Invalid authorization token'});
    }
};

module.exports = {
    middlewareLogin
}