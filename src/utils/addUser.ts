import sql from "../structures/Database";
import { client } from "..";
import clientError from "./clientError";

export default async function addUser(user_id: string) {
  const user = client.guilds.cache.some((guild) =>
    guild.members.cache.some((user) => user.id === user_id)
  );
  if (!user)
    throw new clientError("I don't have any mutual server with that user!");
  const res = await sql`SELECT * FROM users WHERE id = ${user_id}`;
  if (!res.length) await sql`INSERT INTO users (id) VALUES (${user_id})`;
}
