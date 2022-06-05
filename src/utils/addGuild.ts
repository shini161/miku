import sql from "../structures/Database";
import clientError from "./clientError";
import { client } from "..";

export default async function addGuild(guild_id: string) {
  const inGuild = await client.guilds.cache.get(guild_id);
  if (!inGuild)
    throw new clientError("I must be in the guild to save it to the database!");
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;
  if (!res.length) await sql`INSERT INTO guilds (id) VALUES (${guild_id})`;
}
