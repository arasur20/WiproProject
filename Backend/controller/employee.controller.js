const User = require("../model/user");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "EMPLOYEE" });
    return res.json({ data: employees });
  } catch (err) {
    console.error("Get Employees Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const allowed = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      department: req.body.department,
      dob: req.body.dob,
      bloodGroup: req.body.bloodGroup,
      physicalState: req.body.physicalState,
      gymMember: req.body.gymMember,
      therapySupport: req.body.therapySupport,
    };

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: allowed },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "Employee updated", data: updated });
  } catch (err) {
    console.error("Employee Update Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Delete Employee Error:", err);
    return res.status(500).json({ message: "Server error deleting employee" });
  }
};

module.exports = { getAllEmployees, updateEmployee, deleteEmployee };
