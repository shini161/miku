import sql from "../structures/Database";
import config from "../config.json";
import addUser from "./addUser";
import { langsList } from "../../assets/langs/langs";

export default async function getLangUser(user_id): Promise<langsList> {
  const res = await sql`SELECT * FROM users WHERE id = ${user_id}`;
  if (!res.length) await addUser(user_id);
  if (res[0]?.language) return res[0].language;
  return config.default_lang as langsList;
}
