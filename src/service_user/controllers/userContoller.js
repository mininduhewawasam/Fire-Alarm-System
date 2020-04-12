'use strict';
const Joi = require('joi');
const UserService = require('../services/userService');
const Enums = require('../../base_classes/Enums');

//create new user
module.exports.registerUser = async function (req, res) {
    const { error } = _validateUserRegistration(req.body);
    if (!error) {
        const UserServiceInstance = new UserService();
        const user = await UserServiceInstance.registerUser(req.body);
        switch (user) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Email address already in use'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: user });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};

//login User
module.exports.loginUser = async function (req, res) {
    const { error } = _validateUserLogin(req.body);
    if (!error) {
        const UserServiceInstance = new UserService();
        const user = await UserServiceInstance.loginUser(req.body);
        switch (user) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Invalid email or Password'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: user });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};

function _validateUserRegistration(user) {
 const schema = Joi.object().keys({
     firstName: Joi.string().required(),
     lastName: Joi.string().required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(8).required(),
     phoneNumber: Joi.string().max(10).required()
 });
 return Joi.validate(user, schema);
}

function _validateUserLogin(user) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema);
   }