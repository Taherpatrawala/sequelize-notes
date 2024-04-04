const { User } = require("../models");
const { Notes } = require("../models");

const notesControllers = {};

notesControllers.addNote = async (req, res) => {
  const userId = req.user.id;
  return res.json(userId);
};

module.exports = notesControllers;
