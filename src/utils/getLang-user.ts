import sql from "../structures/Database";
import config from "../config.json";
import addUser from "./addUser";

export default async function getLangUser(user_id) {
  const res = await sql`SELECT * FROM users WHERE id = ${user_id}`;
  if (!res.length) await addUser(user_id);
  if (res[0].language) return res[0].language;
  return config.default_lang;
}
