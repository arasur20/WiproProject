const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    status: {
      type: String,
      enum: ["ENROLLED", "COMPLETED", "WITHDRAWN"],
      default: "ENROLLED",
    },

    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rewardGiven: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
