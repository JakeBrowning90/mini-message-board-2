const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

async function getMessages(req, res) {
  // Query for messages
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages });
}

async function getMessageForm(req, res) {
  res.render("form");
}

async function postMessageForm(req, res) {
  const newMessage = req.body;
//   console.log(newMessage);
    await db.insertMessage(newMessage);
    res.redirect("/");
}

async function getMessageDetail(req, res) {
  res.send("Message detail");
}

async function deleteMessage(req, res) {
  res.send("Message delete");
}

module.exports = {
  getMessages,
  getMessageForm,
  postMessageForm,
  getMessageDetail,
  deleteMessage,
};
