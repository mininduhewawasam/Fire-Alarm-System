'use strict';
const Joi = require('joi');
const LocationService = require('../services/locationService');
const Enums = require('../../base_classes/Enums');

//create new user
module.exports.createLocation = async function (req, res) {
    const { error } = _validateCreateLocation(req.body);
    if (!error) {
        const LocationServiceInstance = new LocationService();
        const location = await LocationServiceInstance.createLocation(req.body);
        switch (location) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Owner not found'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: location });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};

module.exports.getAllLocations = async function (req, res) {

    const LocationServiceInstance = new LocationService();
    const location = await LocationServiceInstance.getAllLocations(req.query);
    switch (location) {
        case Enums.ErrorResponses.SERVER_ERROR:
            res.status(500);
            res.json({ msg: 'Something went wrong'});
            break;
        default:
            res.status(200);
            res.json({ data: location });
            break
    }
};

function _validateCreateLocation(location) {
 const schema = {
    ownerId: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    noOfFloors: Joi.number().required()
 };
 return Joi.validate(location, schema);
}

