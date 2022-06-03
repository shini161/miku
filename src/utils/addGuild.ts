import sql from "../structures/Database";

export default async function addGuild(id: string) {
  const res = await sql`SELECT * FROM guilds WHERE id = ${id}`;
  if (!res.length) await sql`INSERT INTO guilds (id) VALUES (${id})`;

}
