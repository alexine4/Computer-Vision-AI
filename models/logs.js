// In this file you crate and sync model table User
const Sequelize = require('sequelize')
// connect to database
const connectDB = require('../connections/connectionDB')
const sequelize = connectDB.sequelize;

class Log extends Sequelize.Model { }


module.exports.initialization = async () => {

    await Log.init({
        logId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        event: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        recognitionResultId: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Logs'
    })
    sequelize.sync({
        alter: true
    })
    return true
}

// function create new item in Users
module.exports.create = async ({event, description, recognitionResultId}, userId ) => {
    return await Log.create({
        event,
        description,
        recognitionResultId,
        userId
    })

}

module.exports.findAllByParameters = async ({ offset, limit} ) => {
    return await Log.findAll({
        order: [['createdAt', 'DESC']],
        offset: Number(offset),
        limit: Number(limit)
    })

}