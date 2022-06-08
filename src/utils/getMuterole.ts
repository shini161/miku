import sql from "../structures/Database";
import addGuild from "./addGuild";
import { client } from "..";

export default async function getMuterole(guild_id: string) {
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) await addGuild(guild_id);
  if (res[0]?.muterole) {
    const guild = client.guilds.cache.get(guild_id);
    if (guild) {
      if (guild.roles.cache.has(res[0].muterole)) return res[0].muterole;
      await sql`UPDATE guilds SET muterole = NULL WHERE id = ${guild_id}`;
    }
  }
  return null;
}
