import sql from "../structures/Database";
import config from "../config.json";
import addGuild from "./addGuild";
import { langsList } from "../../assets/langs/langs";

export default async function getLangGuild(guild_id): Promise<langsList> {
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) await addGuild(guild_id);
  if (res[0]?.language) return res[0].language;
  return config.default_lang as langsList;
}
