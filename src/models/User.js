'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            paranoid: true,
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['password'] }
                }
            }
        }
    )
    return User;
};