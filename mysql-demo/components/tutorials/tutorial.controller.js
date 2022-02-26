const TutorialServices = require("./tutorial.services");

module.exports.getAllTutorials = async (req, res) => {
  const result = await TutorialServices.getAll();
  res.send(result);
};

module.exports.createNewTuorial = async (req, res) => {
  const result = await TutorialServices.create(req.body);
  res.send(result);
};
