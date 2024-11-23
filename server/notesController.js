const Note = require("./note");
const Joi = require("joi");
const { Op } = require("sequelize");

const noteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid("Work", "Personal", "Others"),
  completed: Joi.boolean(),
});

exports.createNote = async (req, res) => {
  const { error } = noteSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
};

exports.getNotes = async (req, res) => {
  const { category, search } = req.query;
  let where = {};
  if (category) where.category = category;
  if (search) where.title = { [Op.like]: `%${search}%` };

  try {
    const notes = await Note.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving notes" });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { error } = noteSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    await note.update(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    await note.destroy();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
};

exports.toggleCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    note.completed = !note.completed;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).send("Error toggling note completion");
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving note" });
  }
};
