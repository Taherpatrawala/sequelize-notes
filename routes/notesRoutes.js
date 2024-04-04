const express = require("express");
const authorize = require("../middleswares/authorize");
const notesControllers = require("../controllers/notesControllers");
const notesRoutes = express.Router();

notesRoutes
  .route("/")
  .get(authorize, notesControllers.getAllNotes)
  .post(authorize, notesControllers.addNote);

notesRoutes
  .route("/:id")
  .get(authorize, notesControllers.getNoteById)
  .put(authorize, notesControllers.updateNoteById)
  .delete(authorize, notesControllers.deleteNoteById);

module.exports = notesRoutes;
