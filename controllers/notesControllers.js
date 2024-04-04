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

notesControllers.updateNoteById = async (req, res) => {
  const noteId = req.params.id;
  const data = req.body;

  try {
    const note = await Notes.findByPk(noteId);
    const updateNote = await note.update(data);
    res.status(202).json(updateNote);
  } catch (error) {
    console.log("Error in updating notes", error);
    res.status(501).json({ message: "Error in updating notes" });
  }
};

notesControllers.deleteNoteById = async (req, res) => {
  const noteId = req.params.id;
  try {
    await Notes.destroy({ where: { id: noteId } });
    return res.status(204).json({ message: "Note deleted succesfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in deleting Note with provided id!" });
  }
};

module.exports = notesControllers;
