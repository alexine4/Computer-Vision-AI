const recognotionResult = require("../models/recognotionResult");
const log = require("../models/logs");

module.exports.addNew = async (req, res) => {
  
  
  try {
    let i=0;
    
    while(req.body[i] !==undefined){
       await recognotionResult.create(req.body[i]).then(
        async result=>{
          if(result.dataValues.detectObject !== 'Worker'){
            const newLog = {
              event: 'Security threat',
              description: 'A trespasser was detected',
              recognitionResultId: result.dataValues.recognitionResultId
            }            
            await log.create(newLog, req.user.userId) 
          }
        }
       )
      i++
      if(req.body[i]===undefined){
        
        return res.status(200).json({message: "ResultSeccesses added"})
      }
    }
    
      
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
};

module.exports.getAllWithParameters = async (req, res) => {    
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