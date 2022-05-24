import { Command } from "../../structures/Command";
import { psql } from "../../structures/Database";

export default new Command({
  name: "test",

  run: async ({ client, message, args }) => {
    psql.query(
      "SELECT * FROM person WHERE gender = 'Male' AND id > 950",
      (err, res) => {
        if (err) console.log(err);
        else console.log(res.rows.length);
      }
    );
  },
});
