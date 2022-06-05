import { Command } from "../../structures/Command";
import { ColorResolvable, Permissions } from "discord.js";
import Colors from "../../../assets/colors.json";
import config from "../../config.json";
import getPrefix from "../../utils/getPrefix";

export default new Command({
  name: "unban",
  usages: "$PREFIX$unban <userID>",
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = await getPrefix(message.guild.id);
      let reason = args.slice(1).join(" ") || "No reason given";
      const color = Colors.celestialBlue;

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}unban <userID> [reason]`,
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
      if (!args[0] || isNaN(+args[0]) || args[0].length !== 18)
        return message.reply({
          embeds: [syntaxError],
        });

      await unbanUser(args[0]);
      function unbanUser(id: string) {
        const isBanned = message.guild.bans.cache.has(id);
        if (!isBanned)
          return message.reply({
            content: "That user is not banned!",
          });

        client.users
            .fetch(id)
            .then(async (user) => {
              const channelEmbed = {
                title: `${user.tag}  (${id}) has been unbanned!`,
                description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
                timestamp: new Date(),
                color: color as ColorResolvable,
              };
              const dmEmbed = {
                title: `You were unbanned from **${message.guild.name}!**`,
                description: `Reason: ${reason} \nModerator: ${message.author.tag}  (${message.author.id})`,
                timestamp: new Date(),
                color: color as ColorResolvable,
              };

              message.guild.members.unban(id).catch(() => {
                return message.reply({
                  content: "Sorry, an error has occured!",
                });
              });
              if (!user.bot) {
                user
                    .send({
                      embeds: [dmEmbed],
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }
              return message.channel.send({
                embeds: [channelEmbed],
              });
            })
            .catch((err) => {
              return;
            });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
