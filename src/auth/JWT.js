const jwt = require('jsonwebtoken');

const SECRET = process.env.API_JWT_SECRET;
const EXPIRES_IN = process.env.API_JWT_EXPIRES_IN;

const JWT = {
    createToken: (email, name) => {
        return jwt.sign({ email, name }, SECRET, { expiresIn: EXPIRES_IN });
    },
    verifyToken: (token) => {
        return jwt.verify(token, SECRET);
    }
}

module.exports = JWT;