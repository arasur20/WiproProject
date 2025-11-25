const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Challenge belongs to a specific program
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    // Simple completion tracking
    completedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
