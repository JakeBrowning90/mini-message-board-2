const pool = require("./pool");

async function getAllJokes() {
  const { rows } = await pool.query("SELECT * FROM jokes");
  return rows;
}

async function insertJoke(joke) {
  await pool.query(
    "INSERT INTO jokes (setup, punchline, poster) VALUES ($1, $2, $3)",
    [joke.setup, joke.punchline, joke.poster]
  );
}

async function getJokeByID(id) {
  const { rows } = await pool.query("SELECT * FROM jokes WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function deleteJokeByID(id) {
  await pool.query("DELETE FROM jokes WHERE id = ($1)", [id]);
}

module.exports = {
  getAllJokes,
  insertJoke,
  getJokeByID,
  deleteJokeByID,
};
