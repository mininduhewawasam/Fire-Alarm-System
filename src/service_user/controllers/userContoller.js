'use strict';
const Joi = require('joi');
const UserService = require('../services/userService');

//create new user
module.exports.registerUser = async function (req, res) {
    res.status(200);
    res.json(req.body);
    console.log('ggggg');
    console.log(process.env.DATABASE);
}