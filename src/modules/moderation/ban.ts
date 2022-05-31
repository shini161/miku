import { Command } from "../../structures/Command";
import { ColorResolvable, Permissions } from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "ban",
  usages: "$PREFIX$ban <@user> [reason]\n$PREFIX$ban <userID> [reason]",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const color: string = Colors.celestialBlue;
      let reason = args.slice(1).join(" ") || "No reason given";
      const prefix = process.env.PREFIX;
      let userID = args[0];

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}ban <@user> [reason]\n${prefix}ban <userID> [reason]`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      if (
        !message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) &&
        !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          content: "You don't have permission to run this command!",
        });
      if (
        !message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS) &&
        !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          content: "I don't have permission to do that!",
        });
      if (!args[0])
        return message.reply({
          embeds: [syntaxError],
        });

      if (
        args[0].startsWith("<@") &&
        args[0].endsWith(">") &&
        args[0].length === 21 &&
        !isNaN(+args[0].slice(2, 20))
      )
        userID = args[0].slice(2, 20);
      else if (
        args[0].startsWith("<@!") &&
        args[0].endsWith(">") &&
        args[0].length === 22 &&
        !isNaN(+args[0].slice(3, 21))
      )
        userID = args[0].slice(3, 21);
      else if (isNaN(+args[0]) || args[0].length !== 18)
        return message.reply({
          embeds: [syntaxError],
        });

      banUser(userID);
      function banUser(id: string) {
        client.users
          .fetch(id)
          .then(async (user) => {
            const channelEmbed = {
              title: `${user.tag}  (${id}) has been banned!`,
              description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
              timestamp: new Date(),
              color: color as ColorResolvable,
            };
            const dmEmbed = {
              title: `You were banned from **${message.guild.name}!**`,
              description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
              timestamp: new Date(),
              color: color as ColorResolvable,
            };

            switch (id) {
              case message.guild.me.id:
                return message.reply({
                  content: "I can't ban myself!",
                });
              case message.author.id:
                return message.reply({
                  content: "You can't ban yourself!",
                });
              case message.guild.ownerId:
                return message.reply({
                  content: "The guild owner can't be banned!",
                });
            }

            const guildUser = message.guild.members.cache.get(id);
            if (guildUser) {
              if (
                message.author.id !== message.guild.ownerId &&
                guildUser.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
              )
                return message.reply({
                  content: "You can't ban an Administrator!",
                });
              if (
                message.author.id !== message.guild.ownerId &&
                guildUser.roles.highest.position >
                  message.member.roles.highest.position
              )
                return message.reply({
                  content:
                    "You can't ban someone that has a higher role than yours!",
                });
              if (
                message.author.id !== message.guild.ownerId &&
                guildUser.roles.highest.position ===
                  message.member.roles.highest.position
              )
                return message.reply({
                  content:
                    "You can't ban someone that has your same higher role!",
                });
              if (
                message.guild.me.roles.highest.position <
                guildUser.roles.highest.position
              )
                return message.reply({
                  content:
                    "I can't ban someone that has a higher role than mine!",
                });
              if (
                message.guild.me.roles.highest.position ===
                guildUser.roles.highest.position
              )
                return message.reply({
                  content:
                    "I can't ban someone that has mine same higher role!",
                });
            }
            if (!user.bot) {
              user
                .send({
                  embeds: [dmEmbed],
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            message.guild.members.ban(id, {
              reason: reason,
            });
            message.channel.send({
              embeds: [channelEmbed],
            });
          })
          .catch((err) => {
            return message.reply({
              content: "I couldn't find that user!",
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
