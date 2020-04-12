'use strict'

class Enums {
    constructor () {
        this.ErrorResponses = {
            DATA_ERROR: 'data error',
            SERVER_ERROR: 'server error',
            NOT_FOUND: 'not found',
            AUTH_ERROR: 'auth error',
        }
    }
}

const enums = new Enums();

module.exports = enums;