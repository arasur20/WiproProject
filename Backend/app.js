const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./db/server");

const authRoutes = require("./routes/auth.routes");
const programRoutes = require("./routes/program.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const eventRoutes = require("./routes/event.routes");
const profileRoutes = require("./routes/profile.routes");
const challengeRoutes = require("./routes/challenge.routes");
const employeeRoutes = require("./routes/employee.routes");
const adminRoutes = require("./routes/admin.routes");

dotenv.config();
const app = express();
connect();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/admin", employeeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("SERVER WORKING");
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED IN THE PORT ${process.env.PORT}`);
});
