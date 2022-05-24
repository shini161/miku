import { Client } from "pg";

export const psql = new Client({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  port: +process.env.DBPORT,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  connectionTimeoutMillis: +process.env.DBTIMEOUT,
});
