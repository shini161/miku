import sql from "../structures/Database";
import { client } from "../index";
import clientError from "./clientError";

export default async function (guild_id: string) {
  if (client.guilds.cache.has(guild_id))
    throw new clientError(
      "I can't remove a guild from the database that I'm currently in!"
    );
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) throw new clientError("That guild is not in the database!");
  await sql`DELETE FROM guilds * WHERE id = ${guild_id}`;
}
