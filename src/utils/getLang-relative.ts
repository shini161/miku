import sql from "../structures/Database";
import config from "../config.json";
import addGuild from "./addGuild";
import getLangUser from "./getLang-user";

export default async function getLangRelative(guild_id: string, user_id) {
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) {
    await addGuild(guild_id);
    return await getLangUser(user_id);
  }
  if (res[0].language) return res[0].language;
  return config.default_lang;
}
