import postgres from "postgres";
export default postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});
