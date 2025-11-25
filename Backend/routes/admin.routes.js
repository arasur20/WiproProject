const express = require("express");
const router = express.Router();
const controller = require("../controller/admin.controller");

router.get("/profile/:id", controller.getAdminProfile);
router.put("/profile/:id", controller.updateAdminProfile);

module.exports = router;
