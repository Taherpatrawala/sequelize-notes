const express = require("express");
const authorize = require("../middleswares/authorize");
const notesControllers = require("../controllers/notesControllers");
const notesRoutes = express.Router();

notesRoutes.post("/addNotes", authorize, notesControllers.addNote);

module.exports = notesRoutes;
