import { psql } from "../structures/Database";

export async function addGuild(id: string) {
  psql.query(`SELECT * FROM guilds WHERE id = '${id}'`, (err, res) => {
    if (err) throw err;
    if (res.rowCount === 0) {
      psql.query(`INSERT INTO guilds (id) VALUES ('${id}')`, (err) => {
        if (err) throw err;
      });
    }
  });
}
