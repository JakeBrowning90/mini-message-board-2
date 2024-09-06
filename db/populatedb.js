const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR ( 255 ),
  author VARCHAR ( 255 ),
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (message, author) 
VALUES
  ('I like apples', 'Amy'),
  ('I like beets', 'Barry'),
  ('I like carrots', 'Cecilia');
`;

async function main() {
  console.log("Seeding...");
  console.log(process.env.CONNECTION_STRING);

  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
