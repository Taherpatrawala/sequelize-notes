const { User } = require("../models");
const { Notes } = require("../models");

const notesControllers = {};

notesControllers.addNote = async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  try {
    await Notes.create({ title, content, UserId: userId });
    res.status(200).json({ message: "Note created successfully" });
  } catch (errors) {
    console.log("Error on addNotes", errors);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = notesControllers;
