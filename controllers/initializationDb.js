const user = require("../models/user");
const recognitionResult = require("../models/recognotionResult");

// initialization
module.exports.initialilazationAll = () => {
  user.initialization();
  recognitionResult.initialization();
};
