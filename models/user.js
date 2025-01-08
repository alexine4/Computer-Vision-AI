// In this file you crate and sync model table User
const Sequelize = require("sequelize");
// connect to database
const connectDB = require("../connections/connectionDB");
const sequelize = connectDB.sequelize;

class User extends Sequelize.Model {}

module.exports.initialization = async () => {
  await User.init(
    {
      userId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      secondName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "security",
        allowNull: false,
      },
      permissionLevel: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  sequelize.sync({
    alter: true,
  });
  return true;
};

// function create new item in Users
module.exports.create = async (
  userName,
  email,
  password,
  firstName,
  secondName,
  role,
  permissionLevel
) => {
  const datatime = new Date();
  await User.create({
    userName,
    email,
    password,
    firstName,
    secondName,
    role,
    permissionLevel: permissionLevel ? permissionLevel : 0,
    lastLogin: datatime,
  });
};
// function find one item in Users and return
module.exports.findOne = async function (colomnName, colomnValue) {
  // find by userName
  if (colomnName === "userName") {
    return await User.findOne({
      where: {
        userName: colomnValue,
      },
    });
  }
  // find by email
  else if (colomnName === "email") {
    return await User.findOne({
      where: {
        email: colomnValue,
      },
    });
  }
  // if incorrect colomn
  else {
    console.log("Incorrect colomn name");
  }
};
// function find one item in User by id
module.exports.findByIds = async function (userId) {
  return await User.findOne({
    where: {
      userId,
    },
  });
};
// function update User by id
module.exports.update = async ({
  userId,
  userName,
  email,
  firstName,
  secondName,
  role,
  permissionLevel,
}) => {
  await User.update(
    {
      userName,
      email,
      firstName,
      secondName,
      role,
      permissionLevel: permissionLevel ? permissionLevel : 0,
    },
    {
      where: {
        userId,
      },
    }
  );
};

module.exports.updateLoginTime = async ({ userId }) => {
  const datatime = new Date();
  await User.update(
    {
      lastLogin: datatime,
    },
    {
      where: {
        userId,
      },
    }
  );
};
// function update password User by id
module.exports.updatePassword = async ({ userName, email, password }) => {
  await User.update(
    {
      password,
    },
    {
      where: {
        userName,
        email,
      },
    }
  );
};
// function check user for 3 parameter
module.exports.checkUser = async ({ userName, email }) => {
  return await User.findOne({
    where: {
      userName,
      email,
    },
  });
};
