'use strict'

const User = require('../../models').User;
const Enums = require('../../base_classes/Enums');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const { logger } = require('../../bootstrap/logger');

class UserService {

    async registerUser(userData) {
        try {
            const { email } = userData;
            const registeredUser = await this._findUserByEmail(email)
            if (registeredUser) {
                return Enums.ErrorResponses.DATA_ERROR;
            } else {
                const hashPass = await this._generatePAsswordHash(userData.password);
                userData.password = hashPass;
                const newUser = await this._createUser(userData);
            }
            return newUser;
            
        } catch (e) {
            logger.error('UserService.registerUser' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async loginUser (userData) {
        try {
            const { email, password } = userData;
            const registeredUser = await this._findUserByEmail(email)
            if (registeredUser) {
                const verifyPassword = await this._verifyPassword(password, registeredUser);
                if (verifyPassword) {
                    const { token } = await this._generateJwtToken(registeredUser);
                    const user = await this._getUserByIdWithoutPassword(registeredUser.id);
                    return { token, user };
                } else {
                    return Enums.ErrorResponses.DATA_ERROR;
                }
            } else {
                return Enums.ErrorResponses.DATA_ERROR;
            }
            
        } catch (e) {
            logger.error('UserService.loginUser ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async _generateJwtToken (user) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 });
        return { token };
    }

    async _getUserByIdWithoutPassword (userId) {
        const user = await User.scope('withoutPassword').findOne({
            where: {id: userId},
            attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                'phoneNumber',
            ]
        })
        return user;
    }

    async _verifyPassword (password, user) {
        const hashedPassword = user.password;
        const verifyHash = await new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, function (err, isMatch) {
                if (err) reject(err);
                resolve(isMatch);
            });
        });
        return verifyHash;
    }

    async _findUserByEmail(email) {
        const user = User.findOne({
            where: {
                email: email
            }
        });
        return user;
    }

    async _generatePAsswordHash (password) {
        const costFactor = 14; //costFactor

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, costFactor, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
        return hashedPassword;
    }

    async _createUser (userDate) {
        const user = await User.create(userDate);
        return user;
    } 

}

module.exports = UserService;