const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    presenter: { type: String },
    mode: { type: String, enum: ["online", "offline"], required: true },
    link: { type: String },
    location: { type: String },
    category: { type: String },
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
