const jwt = require('jsonwebtoken');

const SECRET = process.env.API_JWT_SECRET;
const EXPIRES_IN = process.env.API_JWT_EXPIRES_IN;

const JWT = {
    createToken: (email) => {
        return jwt.sign({ email }, SECRET, { expiresIn: EXPIRES_IN });
    }
}

module.exports = JWT;