// In this file you crate and sync model table User
const Sequelize = require('sequelize')
// connect to database
const connectDB = require('../connections/connectionDB')
const sequelize = connectDB.sequelize;

class AI_model extends Sequelize.Model { }


module.exports.initialization = async () => {

    await AI_model.init({
        userId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        logLevel: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Users12'
    })
    sequelize.sync({
        alter: true
    })
    return true
}

// function create new item in Users
module.exports.create = async (userName, email, password, logLevel ) => {
    await AI_model.create({
        userName: userName,
        email: email,
        password: password,
        logLevel: logLevel ? logLevel : 1
    })

}