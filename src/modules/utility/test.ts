import { Command } from "../../structures/Command";
import { psql } from "../../structures/Database";

export default new Command({
  name: "test",

  run: async ({ client, message, args }) => {
    psql.query(
      `SELECT * FROM guilds WHERE id = '820936214449487912';`,
      (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("\n\n\n\n\n");
        console.log(res.rows[0].id);
        console.log(res.rowCount);
        if (res.fields) return console.log("a");
        console.log("b");
      }
    );
  },
});
