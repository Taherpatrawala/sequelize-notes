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
  const pageNumber = req.query.page || 1;
  const limit = 10;
  const offset = (pageNumber - 1) * limit;
  try {
    const notes = await Notes.findAll({
      where: { UserId: userId },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    if (!notes) {
      return res
        .status(204)
        .json({ message: "Given user has made no notes yet!" });
    }
    res.status(200).json(notes);
  } catch (errors) {
    console.log("Get notes error", errors);
    res.status(500).json("Provided notes list was not found.");
  }
};

notesControllers.getNoteById = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  try {
    const note = await Notes.findOne(
      { where: { id: noteId, UserId: userId } },
      {
        include: [{ model: User, attributes: ["id", "email"] }],
      }
    );
    if (!note) {
      return res.status(400).json({ message: "No Notes with given id found" });
    }
    res.status(202).json(note);
  } catch (errors) {
    console.log("Get notes by id error", errors);
    res.status(500).json("Internal server error");
  }
};

notesControllers.updateNoteById = async (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const data = req.body;

  try {
    const note = await Notes.findOne({ where: { id: noteId, UserId: userId } });
    const updateNote = await note.update(data);
    res.status(202).json(updateNote);
  } catch (error) {
    console.log("Error in updating notes", error);
    res.status(501).json({ message: "Error in updating notes" });
  }
};

notesControllers.deleteNoteById = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  try {
    await Notes.destroy({ where: { id: noteId, UserId: userId } });
    return res.status(200).json({ message: "Note deleted succesfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in deleting Note with provided id!" });
  }
};

module.exports = notesControllers;
