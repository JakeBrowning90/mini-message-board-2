const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const validateUser = [
  body("setup")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Setup must contain between 1 and 255 characters.`),
  body("punchline")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Setup must contain between 1 and 255 characters.`),
  body("poster")
    .trim()
    .isLength({ max: 30 })
    .withMessage(`Name cannot exceed 30 characters.`),
];

async function getJokes(req, res) {
  const jokes = await db.getAllJokes();
  res.render("index", { jokes: jokes });
}

async function getJokeForm(req, res) {
  res.render("form");
}

async function postJokeForm(req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      errors: errors.array(),
    });
  }

  const newJoke = req.body;
  if (!newJoke.poster) {
    newJoke.poster = "Anonymous"
  }
  await db.insertJoke(newJoke);
  res.redirect("/");
}

async function getJokeDetail(req, res) {
  const joke = await db.getJokeByID(req.params.id);
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
