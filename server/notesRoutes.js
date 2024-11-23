const express = require("express");
const router = express.Router();
const notesController = require("./notesController");

router.post("/notes", notesController.createNote);
router.get("/notes", notesController.getNotes);
router.get("/notes/:id", notesController.getNoteById);
router.put("/notes/:id", notesController.updateNote);
router.put("/notes/:id/toggle", notesController.toggleCompleted);
router.delete("/notes/:id", notesController.deleteNote);
router.patch("/notes/:id/completed", notesController.toggleCompleted);

module.exports = router;
