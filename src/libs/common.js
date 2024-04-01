const crypto = require('crypto');

function generateMD5Password(password) {
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(password);
    return md5Hash.digest('hex');
}

function validateMD5Password(password, hashedPassword) {
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(password);
    const hashedInputPassword = md5Hash.digest('hex');
    return hashedInputPassword === hashedPassword;
}

function generateToken() {
    const token = crypto.randomBytes(16).toString('hex');
    return crypto.createHash('md5').update(token).digest('hex').slice(0, 255);
}


module.exports = {
    generateToken,
    generateMD5Password,
    validateMD5Password
}