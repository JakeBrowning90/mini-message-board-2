const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

async function getJokes(req, res) {
  const jokes = await db.getAllJokes();
  res.render("index", { jokes: jokes });
}

async function getJokeForm(req, res) {
  res.render("form");
}

async function postJokeForm(req, res) {
  const newJoke = req.body;
  if (!newJoke.poster) {
    newJoke.poster = "Anonymous"
  }
  await db.insertJoke(newJoke);
  res.redirect("/");
}

async function getJokeDetail(req, res) {
  const joke = await db.getJokeByID(req.params.id);
  console.log(joke);
  res.render("detail", { joke: joke });
}

async function deleteJoke(req, res) {
  await db.deleteJokeByID(req.params.id);
  res.redirect("/");
}

module.exports = {
  getJokes,
  getJokeForm,
  postJokeForm,
  getJokeDetail,
  deleteJoke,
};
