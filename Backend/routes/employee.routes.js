const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employee.controller");

router.get("/employees", employeeController.getAllEmployees);

router.put("/employees/:id", employeeController.updateEmployee);

router.delete("/employees/:id", employeeController.deleteEmployee);

module.exports = router;
