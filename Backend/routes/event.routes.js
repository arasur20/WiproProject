const express = require("express");
const router = express.Router();
const eventController = require("../controller/event.controller");

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

router.post("/register", eventController.registerEvent);
router.get("/my", eventController.myEvents);

router.post("/create", eventController.createEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
