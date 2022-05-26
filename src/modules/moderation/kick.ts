import { Command } from "../../structures/Command";
import { ColorResolvable, Permissions } from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "kick",
  usages: "$PREFIX$kick <@user> [reason]\n$PREFIX$kick <userID> [reason]",
  required: true,

  run: async ({ client, message, args }) => {
    const color = Colors.celestialBlue;
    let reason = args.slice(1).join(" ") || "No reason given";
    const prefix = process.env.PREFIX;
    let userID = args[0];

    const syntaxError = {
      title: "Syntax Error",
      fields: [
        {
          name: "Usages:",
          value: `${prefix}kick <@user> [reason]\n${prefix}kick <userID> [reason]`,
        },
      ],
      color: Colors.syntaxError as ColorResolvable,
    };

    if (
      !message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) &&
      !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    )
      return message.reply({
        content: "You don't have permission to run this command!",
      });
    if (
      !message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS) &&
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
    if (
      args[0].startsWith("<@!") &&
      args[0].endsWith(">") &&
      args[0].length === 22 &&
      !isNaN(+args[0].slice(3, 21))
    )
      userID = args[0].slice(3, 21);
    if (isNaN(+args[0]) || args[0].length !== 18)
      return message.reply({
        embeds: [syntaxError],
      });

    kickUser(userID);
    function kickUser(id) {
      const user = message.guild.members.cache.get(id);
      switch (user?.id) {
        case undefined:
          message.reply({
            content: "You can't kick someone that isn't in this guild!",
          });
          break;
        case message.guild.me.id:
          message.reply({
            content: "I can kick myself!",
          });
          break;
        case message.author.id:
          message.reply({
            content: "You can't kick yourself!",
          });
          break;
        case message.guild.ownerId:
          message.reply({
            content: "The guild owner can't be kicked!",
          });
          break;
        default:
          const channelEmbed = {
            title: `${user.user.tag}  (${id}) has been kicked!`,
            description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
            timestamp: new Date(),
            color: color as ColorResolvable,
          };
          const dmEmbed = {
            title: `You were kicked from **${message.guild.name}!**`,
            description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
            timestamp: new Date(),
            color: color as ColorResolvable,
          };

          if (message.author.id != message.guild.ownerId) {
            if (
              user.roles.highest.position >
              message.member.roles.highest.position
            )
              return message.reply({
                content:
                  "You can't kick someone that has a higher role than yours!",
              });
            if (
              user.roles.highest.position ==
              message.member.roles.highest.position
            )
              return message.reply({
                content:
                  "You can't kick someone that has your same higher role!",
              });
          }

          if (
            message.guild.me.roles.highest.position <
            user.roles.highest.position
          )
            return message.reply({
              content: "I can't kick someone that has a higher role than mine!",
            });
          if (
            message.guild.me.roles.highest.position ==
            user.roles.highest.position
          )
            return message.reply({
              content: "I can't kick someone that has mine same higher role!",
            });
          if (!user.user.bot) {
            user
              .send({
                embeds: [dmEmbed],
              })
              .catch((err) => {
                console.log(err);
              });
          }

          message.guild.members.kick(id, reason);

          message.channel.send({
            embeds: [channelEmbed],
          });
      }
    }
  },
});
