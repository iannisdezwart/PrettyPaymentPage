import { Client } from "pg";

let pgClient: Client;

const reconnect = async () => {
  pgClient = new Client({
    connectionString: process.env.RETOOL_DB_URL,
    keepAlive: true,
  });
  await pgClient.connect();
};

reconnect();

pgClient.on("end", reconnect);
pgClient.on("error", (err) => {
  console.error("Postgres client error:", err);
  reconnect()
});

export const getPgClient = () => pgClient;
