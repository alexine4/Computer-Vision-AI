const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user.js");
const connectionDB = require("../connections/connectionDB.js");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async (req, res) => {
  const login = req.body.emailOrUsername;
  if (login) {
    // ckeck login is email or not
    const checkEmail = user.findOne("email", login);
    checkEmail.then(async(Email) => {
      if (Email !== null) {
        // email already exist
        await user.update()
        const passwordResult = bCrypt.compareSync(
          req.body.password,
          Email.dataValues.password
        );
        if (passwordResult) {
          // generate token
          const token = jwt.sign(
            {
              userId: Email.dataValues.userId,
              permissionLevel: Email.dataValues.permissionLevel,
            },
            connectionDB.jwt,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            token: `Bearer ${token}`,
          });
        } else {
          res.status(401).json({
            message: "Password do not match",
          });
        }
      } else {
        const checkUserName = user.findOne("userName", login);
        checkUserName.then((Name) => {
          if (Name !== null) {
            // UserName already exist
            const passwordResult = bCrypt.compareSync(
              req.body.password,
              Name.dataValues.password
            );
            if (passwordResult) {
              // generate token
              const token = jwt.sign(
                {
                  userId: Name.dataValues.userId,
                  permissionLevel: Name.dataValues.permissionLevel,
                },
                connectionDB.jwt,
                {
                  expiresIn: "24h",
                }
              );
              res.status(200).json({
                token: `Bearer ${token}`,
              });
            } else {
              res.status(401).json({
                message: "Password do not match",
              });
            }
          } else {
            // userName doesn't exist
            res.status(404).json({
              message: "Incorrect input data",
            });
          }
        });
      }
    });
  }
};

module.exports.register = async function (req, res) {
  try {
    // password gurd
    if (req.body.userName && req.body.email && req.body.password) {
      const salt = bCrypt.genSaltSync(10);
      const password = req.body.password;

      user.findOne("userName", req.body.userName).then((userNameExist) => {
        if (userNameExist === null) {
          user.findOne("email", req.body.email).then((emailExist) => {
            if (emailExist === null) {
              // create new user

              user
                .create(
                  req.body.userName,
                  req.body.email,
                  bCrypt.hashSync(password, salt),
                  req.body.firstName,
                  req.body.secondName,
                  req.body.role,
                  req.body.permissionLevel

                )
                .then(() => {
                  res.status(201).json({
                    message: "New user created",
                  });
                });
            } else {
              res.status(404).json({
                message: "User with this email already exists",
              });
            }
          });
        } else {
          res.status(404).json({
            message: "User with this uesrname already exists",
          });
        }
      });
    } else {
      res.status(404).json({
        message: "The password field cannot be empty",
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.checkPassword = async (req, res) => {
  if (req.body.userName) {
    const checkUserName = user.findOne("userName", req.body.userName);
    checkUserName.then((Name) => {
      if (Name !== true) {
        // User already exist
        const passwordResult = bCrypt.compareSync(
          req.body.password,
          Name.dataValues.password
        );
        if (passwordResult) {
          res.status(200).json(true);
        } else {
          res.status(200).json(false);
        }
      } else {
        // user doesn't exist
        res.status(404).json(false);
      }
    });
  }
};

module.exports.checkUser = async (req, res) => {
  try {
    await user
      .checkUser(req.body)
      .then((resulst) => {
        if (resulst !== null) {
          res.status(200).json({
            message: "User with this data exist",
          });
        } else {
          res.status(404).json({
            message: "User with this data does not exist",
          });
        }
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.changePassword = async (req, res) => {
  
  const salt = bCrypt.genSaltSync(10);
  const password = req.body.password;
  try {
    await user
      .updatePassword(
        req.body.userName,
        req.body.email,
        bCrypt.hashSync(password, salt)
      )
      .then(() => {
        res.status(200).json({
          message: "New password successfully setup",
        });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
