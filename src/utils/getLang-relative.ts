import sql from "../structures/Database";
import config from "../config.json";
import addGuild from "./addGuild";
import getLangUser from "./getLang-user";
import { langsList } from "../../assets/langs/langs";

export default async function getLangRelative(
  guild_id: string,
  user_id
): Promise<langsList> {
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) {
    await addGuild(guild_id);
    return await getLangUser(user_id);
  }
  if (res[0]?.language) return res[0].language;
  return config.default_lang as langsList;
}
