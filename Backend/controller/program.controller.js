const mongoose = require("mongoose");
const Program = require("../model/program");
const Enrollment = require("../model/enrollment");

const validateId = (res, id) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid ID format" });
    return false;
  }
  return true;
};

const createProgram = async (req, res) => {
  try {
    const { title, category, description, durationWeeks, startDate, endDate } =
      req.body;

    const program = await Program.create({
      title,
      category,
      description,
      durationWeeks,
      startDate,
      endDate,
      createdBy: req.userId,
    });

    return res
      .status(201)
      .json({ message: "Program created successfully", data: program });
  } catch (err) {
    console.error("Create Program Error:", err);
    return res
      .status(500)
      .json({ message: "Server error while creating program" });
  }
};

// Get All Programs
const getPrograms = async (req, res) => {
  try {
    const userId = req.query.userId;
    const programs = await Program.find();

    const today = new Date();

    const enriched = await Promise.all(
      programs.map(async (p) => {
        const isEnrolled = userId
          ? !!(await Enrollment.findOne({ userId, programId: p._id }))
          : false;

        const start = new Date(p.startDate);
        const end = new Date(p.endDate);

        return {
          ...p.toObject(),
          isEnrolled,
          isCompleted: end < today,
          isExpired: end < today && !isEnrolled,
        };
      })
    );

    return res.json({ data: enriched });
  } catch (err) {
    console.error("Get Programs Error:", err);
    res.status(500).json({ message: "Server error retrieving programs" });
  }
};

const getProgramById = async (req, res) => {
  if (!validateId(res, req.params.id)) return;

  try {
    const userId = req.query.userId;
    const program = await Program.findById(req.params.id);

    if (!program) return res.status(404).json({ message: "Program not found" });

    const today = new Date();
    const programEnd = new Date(program.endDate);

    let isEnrolled = false;

    if (userId) {
      const exists = await Enrollment.findOne({
        userId,
        programId: req.params.id,
      });
      isEnrolled = !!exists;
    }

    return res.json({
      data: {
        ...program.toObject(),
        isEnrolled,
        isCompleted: programEnd < today,
        isCompletedForUser: isEnrolled && programEnd < today,
        isExpired: !isEnrolled && programEnd < today,
      },
    });
  } catch (err) {
    console.error("Get Program Error:", err);
    return res.status(500).json({ message: "Server error retrieving program" });
  }
};

const updateProgram = async (req, res) => {
  if (!validateId(res, req.params.id)) return;

  try {
    const updated = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Program not found" });

    return res.json({ message: "Program updated successfully", data: updated });
  } catch (err) {
    console.error("Update Program Error:", err);
    return res.status(500).json({ message: "Server error updating program" });
  }
};

const deleteProgram = async (req, res) => {
  if (!validateId(res, req.params.id)) return;

  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Program not found" });

    return res.json({ message: "Program deleted successfully" });
  } catch (err) {
    console.error("Delete Program Error:", err);
    return res.status(500).json({ message: "Server error deleting program" });
  }
};

module.exports = {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
};
