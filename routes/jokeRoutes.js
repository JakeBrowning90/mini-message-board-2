const express = require("express");
const jokeController = require("../controllers/jokeController");

const router = express.Router();

// GET all
router.get("/", jokeController.getJokes);

// GET new joke form
router.get("/new", jokeController.getJokeForm);

// POST new joke
router.post("/new", jokeController.postJokeForm);

// GET detail for single joke by ID
router.get("/:id/detail", jokeController.getJokeDetail);

// DELETE single joke by ID
router.post("/:id/delete", jokeController.deleteJoke);

module.exports = router;

