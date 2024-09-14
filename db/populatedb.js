const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS jokes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  setup VARCHAR ( 255 ),
  punchline VARCHAR ( 255 ),
  poster VARCHAR ( 255 ),
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jokes (setup, punchline, poster) 
VALUES
  ('Why did the chicken cross the road?', 'To get to the other side!', 'Amy'),
  ('Why do tigers have stripes?', 'They don''t want to be spotted!', 'Brian'),
  ('Why do golfers wear two pairs of pants?', 'In case they get a hole in one!', 'Carol');
`;

async function main() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
