import sql from "../structures/Database";
import config from "../config.json";
import addGuild from "./addGuild";

export default async function getLangGuild(guild_id) {
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) await addGuild(guild_id);
  if (res[0].language) return res[0].language;
  return config.default_lang;
}
