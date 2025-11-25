const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.put("/update/:id", async (req, res) => {
  try {
    const allowed = {
      name: req.body.name,
      department: req.body.department,
      dob: req.body.dob,
      bloodGroup: req.body.bloodGroup,
      physicalState: req.body.physicalState,
      gymMember: req.body.gymMember,
      therapySupport: req.body.therapySupport,
    };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: allowed },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        dob: user.dob,
        bloodGroup: user.bloodGroup,
        physicalState: user.physicalState,
        gymMember: user.gymMember,
        therapySupport: user.therapySupport,
      },
    });
  } catch (err) {
    console.error("Profile Update Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
