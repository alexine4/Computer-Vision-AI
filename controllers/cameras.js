const camera = require("../models/camera");

module.exports.addNew = async (req, res) => {
  try {
    const result = await camera.create(req.body);
    if (result !== undefined) {
      return res.status(200).json({ message: "Cameras successfuly added" });
    }
  } catch (error) {
    res.status(400).json({ error: "Camera with this name already exist" });
  }
};

module.exports.update = async (req, res) => {
  try {
    await camera.update(req.params.cameraId, req.body);
    return res.status(200).json({ message: "Cameras successfuly updated" });
  } catch (error) {
    res.status(400).json({ error: "Camera with this name already exist" });
  }
};
module.exports.fetchOne = async (req, res) => {
  try {
    const cameras = await camera.fetchOne(req.params.cameraId);
    if (cameras.dataValues !== undefined) {
      return res.status(200).json(cameras.dataValues);
    }
  } catch (error) {
    res.status(400).json({ error: "Camera with this id doesn`t exist" });
  }
};
module.exports.fetchAll = async (req, res) => {
  try {
    const cameras = await camera.fetchAll();
    
    if (cameras[0].dataValues !== undefined) {
      return res.status(200).json(cameras);
    }
  } catch (error) {
    res.status(400).json({ error: "Any cameras doesn`t exist" });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const cameras = await camera.delete(req.params.cameraId);
    console.log(cameras);

    if (cameras) {
      return res.status(200).json({ message: "Camera successfuly deleted" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
};
