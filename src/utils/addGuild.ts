import sql from "../structures/Database";
import clientError from "./clientError";
import { client } from "..";

interface IDataToPass {
  name: string;
  value: any;
}

export default async function addGuild(guild_id, ...args: IDataToPass[]) {
  let params = args.filter((item) => item.name);
  const values = args.filter((item) => item.value);
  const inGuild = await client.guilds.cache.get(guild_id);
  if (!inGuild)
    throw new clientError("I must be in the guild to save it to the database!");
  const res = await sql`SELECT * FROM guilds WHERE id = ${guild_id}`;

  if (!res.length)
    if (!params.length) await sql`INSERT INTO guilds (id) VALUES (${guild_id})`;
    else
      await sql`INSERT INTO guilds (id, ${params.join(
        ", "
      )}) VALUES (${guild_id}, ${values.join(", ")})`;
}
