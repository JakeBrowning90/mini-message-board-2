const asyncHandler = require("express-async-handler");

class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    // So the error is neat when stringified. NotFoundError: message instead of Error: message
    this.name = "NotFoundError";
  }
}

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await someDBQueryToGetUser(userId);
  if (!user) {
    throw new CustomNotFoundError("User not found");
  }
  res.send(`User found: ${user.name}`);
});

const getUsers = asyncHandler(async (req, res) => {
  // Code
});

const createUser = asyncHandler(async (req, res) => {
  // Code
});

module.exports = { getUserById, getUsers, createUser };
