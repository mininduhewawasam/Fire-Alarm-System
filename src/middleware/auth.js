const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        res.status(401);
        res.json({ msg: 'Authorization denied' });
    } else {
        try {
            const decode = jwt.verify(token, keys.jwtSecret);
            req.user = decode;
            req.body.modifiedBy = decode.id;
            next();
        } catch (e) {
            res.status(400);
            res.json({ msg: 'invalid token' });
        }
    }
}

module.exports = auth;