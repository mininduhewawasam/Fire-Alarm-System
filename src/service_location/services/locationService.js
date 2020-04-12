'use strict'

const Location = require('../../models').Location;
const User = require('../../models').User;
const Floor = require('../../models').Floor;
const Room = require('../../models').Room;
const { logger } = require('../../bootstrap/logger');
const Enums = require('../../base_classes/Enums');

class LocationService {

    async createLocation(locationData) {
        try {
            const user = await this._getUserById (locationData.ownerId);
            if (user) {
                const location = await this._createLocation(locationData);
                if (location) {
                    return location;
                } else {
                    return Enums.ErrorResponses.DATA_ERROR;
                }
            } else {
                return Enums.ErrorResponses.DATA_ERROR;
            }
        } catch (e) {
            logger.error('LocationService.createLocation ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async getAllLocations(args) {
        try {
            const locations = await this._getAllLocations(args);
            return locations;       
        } catch (e) {
            logger.error('LocationService.getAllLocations ' + e);
            return Enums.ErrorResponses.SERVER_ERROR
        }
    }

    async _getAllLocations (args) {
        const options = {
            order: [['id', 'DESC']]
        };
        const whereObj = {};
        if (args.ownerId) {
            whereObj.ownerId = args.ownerId;
        }
        if (whereObj) {
            options.where = whereObj;
        }
        options.include = [
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
        const locations = await Location.findAll(options);
        return { locations }
    }

    async _createLocation (locationData) {
        const location = await Location.create(locationData)
        return location;
    }

    async _getUserById(ownerId) {
        const user = User.findOne({
            where: { id: ownerId }
        });
        
        return user;
    }


}

module.exports = LocationService;