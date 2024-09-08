const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

// async function getSearchedUsernames(query) {
//   console.log(query);
//   const { rows } = await pool.query(
//     "SELECT * FROM usernames WHERE LOWER(username) LIKE LOWER('%' || ($1) || '%')",
//     [query]
//   );
//   return rows;
// }

async function insertMessage(message) {
  await pool.query("INSERT INTO messages (message, author) VALUES ($1, $2)", [
    message.message,
    message.author,
  ]);
}

async function getMessageByID(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function deleteMessageByID(id) {
  await pool.query("DELETE FROM messages WHERE id = ($1)", [id]);
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageByID,
  deleteMessageByID,
};
