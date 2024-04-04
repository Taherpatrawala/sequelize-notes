const { User } = require("../models");
const { Notes } = require("../models");

const notesControllers = {};

notesControllers.addNote = async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  try {
    await Notes.create({ title, content, UserId: userId });
    res.status(201).json({ message: "Note created successfully" });
  } catch (errors) {
    console.log("Error on addNotes", errors);
    return res.status(500).json({ message: "Internal server error" });
  }
};

notesControllers.getAllNotes = async (req, res) => {
  const userId = req.user.id;
  try {
    const notes = await Notes.findAll({ where: { UserId: userId } });
    if (!notes) {
      return res
        .status(204)
        .json({ message: "Given user has made no notes yet!" });
    }
    res.status(200).json(notes);
  } catch (errors) {
    console.log("Get notes error", errors);
    res.status(500).json("Internal server error");
  }
};

notesControllers.getNoteById = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Notes.findByPk(noteId, {
      include: [{ model: User, attributes: ["id", "email"] }],
    });
    res.status(202).json(note);
  } catch (errors) {
    console.log("Get notes by id error", errors);
    res.status(500).json("Internal server error");
  }
};

notesControllers.deleteNote = async (req, res) => {
  const userId = req.user.id;
  const { noteId } = req.body;
};

module.exports = notesControllers;
