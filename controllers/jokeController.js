const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const validateForm = [
  body("setup")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Setup must contain between 1 and 255 characters.`),
  body("punchline")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Punchline must contain between 1 and 255 characters.`),
  body("poster")
    .trim()
    .isLength({ max: 30 })
    .withMessage(`Name cannot exceed 30 characters.`),
];

exports.getJokes = asyncHandler(async (req, res) => {
  const jokes = await db.getAllJokes();
  res.render("index", { jokes: jokes });
});

exports.getJokeForm = asyncHandler(async (req, res) => {
  res.render("form");
});

exports.postJokeForm = [
  validateForm,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
      });
    }

    const newJoke = req.body;
    if (!newJoke.poster) {
      newJoke.poster = "Anonymous";
    }
    await db.insertJoke(newJoke);
    res.redirect("/");
  }),
];

exports.getJokeDetail = asyncHandler(async (req, res) => {
  const joke = await db.getJokeByID(req.params.id);
  res.render("detail", { joke: joke });
});

exports.deleteJoke = asyncHandler(async (req, res) => {
  await db.deleteJokeByID(req.params.id);
  res.redirect("/");
});
