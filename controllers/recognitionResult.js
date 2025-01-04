const recognotionResult = require("../models/recognotionResult");
const errorHandler = require("../utils/errorHandler");

module.exports.addNew = async (req, res) => {
  try {
    const result = await recognotionResult.create( req.body)
    if (result.dataValues !== null) {
        
        return res.status(200).json({message: "ResultSeccesses added"})
    }
      
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
};

module.exports.getAll = async (req, res) => {    
  try {
    const result = await recognotionResult.findAll( req.query)
    if (result.dataValues !== null) {
        return res.status(200).json(result)
    }
    res.status(404).json({ message: "Recognotion result for this camera does not exist" }); 
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
};