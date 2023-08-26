import { Pool } from "pg";

let pgClient: Pool;

const connect = async () => {
  pgClient = new Pool({
    connectionString: process.env.RETOOL_DB_URL,
    keepAlive: true,
  });
  await pgClient.connect();
};

connect();

pgClient.on("error", (err) => {
  console.error("Postgres client error:", err);
  connect()
});

export const getPgClient = () => pgClient;
