import sql from "../structures/Database";
import config from "../config.json";
import addGuild from "./addGuild";

export default async function getPrefix(guild_id: string): Promise<string> {
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) await addGuild(guild_id);
  if (res[0]?.prefix) return res[0].prefix;
  else return config.prefix;
}
