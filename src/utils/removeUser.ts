import sql from "../structures/Database";
import clientError from "./clientError";

export default async function (user_id: string) {
  const res = await sql`SELECT * FROM users WHERE id = ${user_id}`;
  if (!res.length) throw new clientError("That user is not in the database!");
  await sql`DELETE FROM users * WHERE id = ${user_id}`;
}
