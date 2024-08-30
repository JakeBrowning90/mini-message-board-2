const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// router.use(authMiddleware)

// router level middlewares

// GET request for getting all users
router.get("/", userController.getUsers);

// You will likely place your validation/authentication middleware functions here or perhaps in the controller file, e.g.
// router.post(validationMiddleware, userController.createUser)

// POST request for creating a user
router.post("/", userController.createUser);

// GET request for getting a user by id
router.get("/:id", userController.getUserById);

module.exports = router;
