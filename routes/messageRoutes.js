const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

// GET all
router.get("/", messageController.getMessages);

// GET new message form
router.get("/new", messageController.getMessageForm);

// POST new message
router.post("/new", messageController.postMessageForm);

// GET detail for single message by ID
router.get("/:id/detail", messageController.getMessageDetail);

// DELETE single message by ID
router.post("/:id/delete", messageController.deleteMessage);

module.exports = router;

