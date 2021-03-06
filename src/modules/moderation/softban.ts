import { Command } from "../../structures/Command";
import { ColorResolvable, Permissions } from "discord.js";
import Colors from "../../../assets/colors.json";
import config from "../../config.json";
import getPrefix from "../../utils/getPrefix";

export default new Command({
  name: "softban",
  usages: "$PREFIX$softban <@user> [reason]\n$PREFIX$softban <userID> [reason]",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const color: string = Colors.celestialBlue;
      let reason = args.slice(1).join(" ") || "No reason given";
      const prefix = await getPrefix(message.guild.id);
      let userID = args[0];

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}softban <@user> [reason]\n${prefix}softban <userID> [reason]`,
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

      softbanUser(userID);
      function softbanUser(id: string) {
        client.users
          .fetch(id)
          .then(async (user) => {
            const channelEmbed = {
              title: `${user.tag}  (${id}) has been softbanned!`,
              description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
              timestamp: new Date(),
              color: color as ColorResolvable,
            };
            const dmEmbed = {
              title: `You were softbanned from **${message.guild.name}!**`,
              description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
              timestamp: new Date(),
              color: color as ColorResolvable,
            };

            switch (id) {
              case message.guild.me.id:
                return message.reply({
                  content: "I can't softban myself!",
                });
              case message.author.id:
                return message.reply({
                  content: "You can't softban yourself!",
                });
              case message.guild.ownerId:
                return message.reply({
                  content: "The guild owner can't be softbanned!",
                });
            }

            const guildUser = message.guild.members.cache.get(id);
            if (guildUser) {
              if (
                message.author.id !== message.guild.ownerId &&
                guildUser.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
              )
                return message.reply({
                  content: "You can't softban an Administrator!",
                });
              if (
                message.author.id !== message.guild.ownerId &&
                guildUser.roles.highest.position >
                  message.member.roles.highest.position
              )
                return message.reply({
                  content:
                    "You can't softban someone that has a higher role than yours!",
                });
              if (
                message.author.id !== message.guild.ownerId &&
                guildUser.roles.highest.position ===
                  message.member.roles.highest.position
              )
                return message.reply({
                  content:
                    "You can't softban someone that has your same higher role!",
                });
              if (
                message.guild.me.roles.highest.position <
                guildUser.roles.highest.position
              )
                return message.reply({
                  content:
                    "I can't softban someone that has a higher role than mine!",
                });
              if (
                message.guild.me.roles.highest.position ===
                guildUser.roles.highest.position
              )
                return message.reply({
                  content:
                    "I can't softban someone that has mine same higher role!",
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
            await message.guild.members.ban(id, {
              reason: reason,
            });
            await message.guild.members.unban(id);
            message.channel.send({
              embeds: [channelEmbed],
            });
          })
          .catch(() => {
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
