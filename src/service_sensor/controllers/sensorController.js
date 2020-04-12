'use strict';
const Joi = require('joi');
const CategoryService = require('../services/sensorService');

//create sensor data
module.exports.create = async function (req, res) {
    res.status(200);
    res.json(req.body);
    console.log('ggggg');
    console.log(process.env.DATABASE);
}