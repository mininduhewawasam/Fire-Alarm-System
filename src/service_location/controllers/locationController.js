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

module.exports.createFloor = async function (req, res) {
    const { error } = _validateCreateFloor(req.body);
    if (!error) {
        const LocationServiceInstance = new LocationService();
        const floor = await LocationServiceInstance.createFloor(req.body);
        switch (floor) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Location not found'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: floor });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};

module.exports.createRoom = async function (req, res) {
    const { error } = _validateCreateRoom(req.body);
    if (!error) {
        const LocationServiceInstance = new LocationService();
        const room = await LocationServiceInstance.createRoom(req.body);
        switch (room) {
            case Enums.ErrorResponses.DATA_ERROR:
                res.status(400);
                res.json({ msg: 'Location not found'});
                break;
            case Enums.ErrorResponses.SERVER_ERROR:
                res.status(500);
                res.json({ msg: 'Something went wrong'});
                break;
            default:
                res.status(200);
                res.json({ data: room });
                break
        }
    } else {
        res.status(400);
        res.json({ msg: error.details[0].message });
    }
};

module.exports.getAllFloors = async function (req, res) {

    const LocationServiceInstance = new LocationService();
    const floors = await LocationServiceInstance.getAllFloors();
    switch (floors) {
        case Enums.ErrorResponses.SERVER_ERROR:
            res.status(500);
            res.json({ msg: 'Something went wrong'});
            break;
        default:
            res.status(200);
            res.json({ data: floors });
            break
    }
};

module.exports.getFloorsByLocationId = async function (req, res) {

    const LocationServiceInstance = new LocationService();
    const floors = await LocationServiceInstance.getFloorsByLocationId(
        req.params.locationId
    );
    switch (floors) {
        case Enums.ErrorResponses.DATA_ERROR:
            res.status(400);
            res.json({ msg: 'Location not found'});
            break;
        case Enums.ErrorResponses.SERVER_ERROR:
            res.status(500);
            res.json({ msg: 'Something went wrong'});
            break;
        default:
            res.status(200);
            res.json({ data: floors });
            break
    }
};

module.exports.getRoomsByLocationIdAndFloorId = async function (req, res) {

    const LocationServiceInstance = new LocationService();
    const rooms = await LocationServiceInstance.getRoomsByLocationIdAndFloorId(
        req.params.locationId,
        req.params.floorId
    );
    switch (rooms) {
        case Enums.ErrorResponses.DATA_ERROR:
            res.status(400);
            res.json({ msg: 'Rooms not found'});
            break;
        case Enums.ErrorResponses.SERVER_ERROR:
            res.status(500);
            res.json({ msg: 'Something went wrong'});
            break;
        default:
            res.status(200);
            res.json({ data: rooms });
            break
    }
};

function _validateCreateLocation(location) {
 const schema = {
    ownerId: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    noOfFloors: Joi.number().required(),
    modifiedBy: Joi.allow()
 };
 return Joi.validate(location, schema);
}

function _validateCreateFloor(floor) {
    const schema = {
       locationId: Joi.number().required(),
       name: Joi.string().required(),
       floorNo: Joi.number().required(),
       noOfRooms: Joi.number().required(),
       modifiedBy: Joi.allow()
    };
    return Joi.validate(floor, schema);
   }

   function _validateCreateRoom(room) {
    const schema = {
       floorId: Joi.number().required(),
       name: Joi.string().required(),
       roomNo: Joi.number().required(),
       noOfSensors: Joi.number().required(),
       modifiedBy: Joi.allow()
    };
    return Joi.validate(room, schema);
   }

