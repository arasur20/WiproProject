const User = require("../model/user");

const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id).select("-password");

    if (!admin || admin.role !== "ADMIN") {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ data: admin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const updateData = { name, email, department };

    if (password) updateData.password = password;

    const admin = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    res.json({ message: "Profile updated", data: admin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminProfile, updateAdminProfile };
