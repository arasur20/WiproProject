const Challenge = require("../model/challenges");
const Enrollment = require("../model/enrollment");
const Program = require("../model/program");

const createChallenge = async (req, res) => {
  try {
    const { title, description, programId, difficulty } = req.body;

    if (!title || !description || !programId)
      return res.status(400).json({ message: "Missing fields" });

    const challenge = await Challenge.create({
      title,
      description,
      programId,
      difficulty,
    });

    return res.json({ success: true, data: challenge });
  } catch (err) {
    console.error("Create Challenge Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getChallenges = async (req, res) => {
  try {
    const list = await Challenge.find()
      .populate("programId", "title category")
      .sort({ createdAt: -1 });

    return res.json({ success: true, data: list });
  } catch (err) {
    console.error("Get Challenge Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const markCompleted = async (req, res) => {
  try {
    const { challengeId, userId } = req.params;

    const challenge = await Challenge.findById(challengeId);

    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });

    if (!challenge.completedBy.includes(userId)) {
      challenge.completedBy.push(userId);
      await challenge.save();
    }

    return res.json({ success: true, message: "Marked as completed" });
  } catch (err) {
    console.error("Mark Completed Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getChallengesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const completedPrograms = await Enrollment.find({
      userId,
      progressPercentage: 100,
    }).select("programId");

    const programIds = completedPrograms.map((e) => e.programId);

    if (programIds.length === 0) {
      return res.json({ data: [] });
    }

    const challenges = await Challenge.find({
      programId: { $in: programIds },
    }).populate("programId", "title");

    const result = challenges.map((ch) => ({
      ...ch._doc,
      isCompleted: ch.completedBy.includes(userId),
    }));

    return res.json({ data: result });
  } catch (err) {
    console.error("Error loading user challenges:", err);
    return res.status(500).json({ message: "Server error loading challenges" });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    const challenge = await Challenge.findById(id).populate(
      "programId",
      "title"
    );

    if (!challenge)
      return res.status(404).json({ message: "Challenge not found" });

    const isCompleted = challenge.completedBy.includes(userId);

    return res.json({
      success: true,
      data: {
        ...challenge._doc,
        isCompleted,
      },
    });
  } catch (err) {
    console.error("Get Challenge Error:", err);
    return res.status(500).json({ message: "Server error loading challenge" });
  }
};

const updateChallenge = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Challenge.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update Challenge Error:", err);
    return res.status(500).json({ message: "Server error updating challenge" });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Challenge.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    return res.json({ success: true, message: "Challenge deleted" });
  } catch (err) {
    console.error("Delete Challenge Error:", err);
    return res.status(500).json({ message: "Server error deleting challenge" });
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  markCompleted,
  getChallengesForUser,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
};
