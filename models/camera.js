// In this file you crate and sync model table User
const Sequelize = require('sequelize')
// connect to database
const connectDB = require('../connections/connectionDB')
const sequelize = connectDB.sequelize;

class Camera extends Sequelize.Model { }


module.exports.initialization = async () => {

    await Camera.init({
        cameraId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
        cameraType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Cameras'
    })
    sequelize.sync({
        alter: true
    })
    return true
}

// function create new item in Users
module.exports.create = async ({name, cameraType, location} ) => {
    return await Camera.create({
        name,
        cameraType,
        location
    })
}
module.exports.update = async (cameraId,{ name, cameraType, location} ) => {
    return await Camera.update({
        name,
        cameraType,
        location
    },{
        where:{
            cameraId 
        }
    }
)
}
module.exports.delete = async ({cameraId} ) => {
   return await Camera.destroy({
        where:{
            cameraId 
        }
    }
)
}
module.exports.fetchOne = async (cameraId ) => {
    return await Camera.findOne({
        where:{
            cameraId 
        }
    }
)
}
module.exports.fetchAll = async () => {
    return await Camera.findAll()
}
