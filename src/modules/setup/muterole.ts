import { Command } from "../../structures/Command";
import { Permissions, Role } from "discord.js";
import { psql } from "../../structures/Database";
import { addGuild } from "../../Utilities/addGuild";

export default new Command({
  name: "muterole",
  aliases: ["mute-role"],
  usages:
    "$PREFIX$muterole ~> to see current settings\n$PREFIX$muterole [@role]\n$PREFIX$muterole [roleID]",
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ client, message, args }) => {
    let roleID = args[0];
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.reply({
        content: "You don't have permission to run this command!",
      });

    if (!args[0]) {
      let text = "No muterole has been set yet!";
      let muterole: Role;

      psql.query(
        `SELECT muterole FROM guilds WHERE id = '${message.guild.id}'`,
        async (err, res) => {
          if (err) throw err;
          if (!res.rowCount) await addGuild(message.guild.id);
          else muterole = message.guild.roles.cache.get(res.rows[0].muterole);
          if (muterole)
            text = `The current muterole set for this guild is ${muterole}`;
          else
            psql.query(
              `UPDATE guilds SET muterole = NULL WHERE id = '${message.guild.id}'`,
              (err) => {
                if (err) throw err;
              }
            );
          return message.reply({
            content: text,
            allowedMentions: { parse: ["users"] },
          });
        }
      );
      return;
    }

    if (args[0].toLowerCase() === "null") return resetMuterole();

    if (
      args[0].startsWith("<@&") &&
      args[0].endsWith(">") &&
      args[0].length === 22 &&
      !isNaN(+args[0].slice(3, 21))
    )
      roleID = args[0].slice(3, 21);
    else if (isNaN(+args[0]) || args[0].length !== 18)
      return message.reply({
        content: "Please provide a valid role!",
      });

    setMuterole(roleID);

    function setMuterole(id: string) {
      let role = message.guild.roles.cache.get(id);
      if (!role)
        return message.reply({
          content: "Please provide a valid role!",
        });

      if (role.managed)
        return message.reply({
          content: "You can't assign that role!",
        });
      if (role.position >= message.guild.me.roles.highest.position)
        return message.reply({
          content: "I'm not high enough in the hierarcy to assign that role!",
        });

      psql.query(
        `SELECT * FROM guilds WHERE id = '${message.guild.id}'`,
        async (err, res) => {
          if (err) throw err;
          if (!res.rowCount) await addGuild(message.guild.id);

          if (id !== res.rows[0].muterole) {
            psql.query(
              `UPDATE guilds SET muterole = '${id}' WHERE id = '${message.guild.id}'`,
              (err) => {
                if (err) throw err;
              }
            );
          }
          return message.reply({
            content: `The muterole has been set to ${role}`,
          });
        }
      );
    }

    function resetMuterole() {
      psql.query(
        `SELECT * FROM guilds WHERE id = '${message.guild.id}'`,
        async (err, res) => {
          if (err) throw err;
          if (!res.rowCount) await addGuild(message.guild.id);

          psql.query(
            `UPDATE guilds SET muterole = NULL WHERE id = '${message.guild.id}'`,
            (err) => {
              if (err) throw err;
            }
          );

          return message.reply({
            content: "The muterole has been reset for this guild!",
          });
        }
      );
    }
  },
});
