const express = require("express");
const router = express.Router();
const controller = require("../controller/challenge.controller");

router.post("/", controller.createChallenge);
router.get("/", controller.getChallenges);

router.get("/user/:userId", controller.getChallengesForUser);
router.put("/:challengeId/complete/:userId", controller.markCompleted);

router.put("/:id", controller.updateChallenge);
router.delete("/:id", controller.deleteChallenge);

router.get("/:id", controller.getChallengeById);

module.exports = router;
