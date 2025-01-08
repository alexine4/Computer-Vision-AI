const user = require("../models/user");
const recognitionResult = require("../models/recognotionResult");
const camera = require("../models/camera");
const log = require("../models/logs");

// initialization
module.exports.initialilazationAll = () => {
  user.initialization();
  recognitionResult.initialization();
  camera.initialization();
  log.initialization();
};
