// In this file you crate and sync model table User
const Sequelize = require('sequelize')
// connect to database
const connectDB = require('../connections/connectionDB')
const sequelize = connectDB.sequelize;

class RecognitionResult extends Sequelize.Model { }


module.exports.initialization = async () => {

    await RecognitionResult.init({
        recognitionResultId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        detectObject: {
            type: Sequelize.STRING,
            allowNull: false
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false
        },        
        confidenceScore: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        ai_modelId: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        cameraId: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'RecognitionResult'
    })
    sequelize.sync({
        alter: true
    })
    return true
}

// function create new item in Users
module.exports.create = async ({detectObject,confidenceScore,timestamp,ai_modelId,cameraId} ) => {
   return await RecognitionResult.create({
        detectObject,
        confidenceScore,
        timestamp,
        ai_modelId,
        cameraId
    })
}

module.exports.findAll = async({cameraId, offset, limit})=>{
    
    
    return await RecognitionResult.findAll({
        where:{
           cameraId
        }, 
        order: [['createdAt', 'DESC']],
        offset: Number(offset),
        limit: Number(limit)
    })
}