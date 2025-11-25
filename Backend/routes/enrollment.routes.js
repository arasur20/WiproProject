const express = require("express");
const router = express.Router();
const enrollmentController = require("../controller/enrollment.controller");

router.post("/", enrollmentController.enroll);
router.get("/my", enrollmentController.getMyEnrollments);
router.put(
  "/program/:programId/user/:userId",
  enrollmentController.updateEmployeeProgress
);
router.get("/program/:programId", enrollmentController.getEnrollmentsByProgram);
router.delete("/:id", enrollmentController.withdraw);

router.get("/", enrollmentController.getAllEnrollments);

module.exports = router;
