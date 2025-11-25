const Program = require("../model/program");
const Enrollment = require("../model/enrollment");
const User = require("../model/user");
const mongoose = require("mongoose");

const validateId = (res, id) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid ID format" });
    return false;
  }
  return true;
};

const enroll = async (req, res) => {
  const { programId, userId } = req.body;

  if (!programId || !userId) {
    return res.status(400).json({ message: "programId and userId required" });
  }

  if (!validateId(res, programId) || !validateId(res, userId)) return;

  try {
    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ message: "Program not found" });

    const existing = await Enrollment.findOne({ programId, userId });
    if (existing) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = await Enrollment.create({
      programId,
      userId,
      progressPercentage: 0,
      rewardGiven: false,
    });

    return res.status(201).json({
      message: "Enrolled successfully",
      data: enrollment,
    });
  } catch (err) {
    console.error("Enroll Error:", err);
    return res.status(500).json({
      message: "Server error during enrollment",
    });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) return res.status(400).json({ message: "userId required" });

    const list = await Enrollment.find({ userId }).populate("programId");

    return res.json({ data: list });
  } catch (err) {
    console.error("Get Enrollments Error:", err);
    return res.status(500).json({
      message: "Server error retrieving enrollments",
    });
  }
};

const updateProgress = async (req, res) => {
  const { id } = req.params;
  const { progressPercentage, userId, updatedByAdmin } = req.body;

  if (!validateId(res, id)) return;

  try {
    const enrollment = await Enrollment.findById(id);

    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    if (!updatedByAdmin && enrollment.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to update this progress",
      });
    }

    enrollment.progressPercentage = progressPercentage;
    await enrollment.save();
    if (progressPercentage === 100 && !enrollment.rewardGiven) {
      const user = await User.findById(enrollment.userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      user.rewardPoints = (user.rewardPoints || 0) + 1000;
      await user.save();

      enrollment.rewardGiven = true;
      await enrollment.save();
    }

    return res.json({
      message: "Progress updated",
      data: enrollment,
    });
  } catch (err) {
    console.error("Progress Update Error:", err);
    return res.status(500).json({
      message: "Server error updating progress",
    });
  }
};

const withdraw = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateId(res, id)) return;

    const deleted = await Enrollment.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Enrollment not found" });

    return res.json({ message: "Withdraw successful" });
  } catch (err) {
    console.error("Withdraw Error:", err);
    return res.status(500).json({ message: "Server error withdrawing" });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const list = await Enrollment.find().populate("userId programId");
    return res.json({ data: list });
  } catch (err) {
    console.error("Get All Error:", err);
    return res.status(500).json({
      message: "Server error retrieving enrollments",
    });
  }
};

const getEnrollmentsByProgram = async (req, res) => {
  try {
    const programId = req.params.programId;

    const enrollments = await Enrollment.find({ programId })
      .populate("userId", "name email department")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: enrollments.map((e) => ({
        _id: e._id,
        user: e.userId,
        progressPercentage: e.progressPercentage,
        status: e.status,
        createdAt: e.createdAt,
      })),
    });
  } catch (err) {
    console.error("Get Enrollments Error:", err);
    return res
      .status(500)
      .json({ message: "Server error retrieving enrollments" });
  }
};

const updateEmployeeProgress = async (req, res) => {
  try {
    const { programId, userId } = req.params;
    const { progressPercentage } = req.body;

    if (progressPercentage < 0 || progressPercentage > 100) {
      return res.status(400).json({ message: "Progress must be 0–100" });
    }

    const enrollment = await Enrollment.findOne({ programId, userId });

    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });

    enrollment.progressPercentage = progressPercentage;

    if (progressPercentage === 100 && !enrollment.rewardGiven) {
      const user = await User.findById(userId);
      if (user) {
        user.rewardPoints = (user.rewardPoints || 0) + 1000;
        await user.save();
      }

      enrollment.rewardGiven = true;
    }

    await enrollment.save();

    return res.json({
      message: "Progress updated successfully",
      data: enrollment,
    });
  } catch (err) {
    console.error("Update Progress Error:", err);
    return res.status(500).json({ message: "Server error updating progress" });
  }
};
module.exports = {
  enroll,
  getMyEnrollments,
  updateProgress,
  withdraw,
  getAllEnrollments,
  getEnrollmentsByProgram,
  updateEmployeeProgress,
};
