const User = require("../model/user");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, adminKey, department } =
      req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role:
        adminKey && adminKey === process.env.ADMIN_ACCESS_KEY
          ? "ADMIN"
          : "EMPLOYEE",
      department: department ? department.trim() : "",
      dob: null,
      bloodGroup: "",
      physicalState: "",
      gymMember: "",
      therapySupport: "",
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        rewardPoints: user.rewardPoints,
        dob: user.dob,
        bloodGroup: user.bloodGroup,
        physicalState: user.physicalState,
        gymMember: user.gymMember,
        therapySupport: user.therapySupport,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        rewardPoints: user.rewardPoints,
        dob: user.dob || null,
        bloodGroup: user.bloodGroup || "",
        physicalState: user.physicalState || "",
        gymMember: user.gymMember || "",
        therapySupport: user.therapySupport || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};
module.exports = { register, login };
