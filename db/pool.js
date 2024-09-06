const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

// module.exports = new Pool({
//   host: "localhost", // or wherever the db is hosted
//   user: "jakebrowning",
//   database: "mmb2db",
//   password: "jakexubuntu2023!",
//   port: 5432 // The default port
// });
