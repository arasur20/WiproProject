const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+(?:[.-][a-z0-9]+)*@gmail\.com$/i,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["EMPLOYEE", "ADMIN"],
      default: "EMPLOYEE",
    },

    department: {
      type: String,
      default: "",
      trim: true,
    },
    dob: { type: Date, default: null },
    rewardPoints: {
      type: Number,
      default: 0,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", ""],
      default: "",
    },

    physicalState: {
      type: String,
      enum: ["Fit", "Normal", "Under Treatment", ""],
      default: "",
    },

    gymMember: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },

    therapySupport: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
