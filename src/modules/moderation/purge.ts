import { Command } from "../../structures/Command";
import {
  Permissions,
  ColorResolvable,
  GuildChannelResolvable,
} from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "purge",
  aliases: ["clear"],
  usages: "$PREFIX$purge <amount>",
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ client, message, args }) => {
    if (message.channel.type === "DM") return;
    try {
      const prefix = process.env.PREFIX;

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages",
            value: `${prefix}purge <amount>`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      if (
        !message.member
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.MANAGE_MESSAGES) &&
        !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          content: "You don't have permission to run this command!",
        });

      if (
        !message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.MANAGE_MESSAGES) &&
        !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          content: "I don't have permission to do that!",
        });

      if (!args[0])
        return message.reply({
          embeds: [syntaxError],
        });

      if (isNaN(+args[0]))
        return message.reply({
          content: "`<amount>` must be a number!",
        });

      if (+args[0] <= 0 || +args[0] > 99)
        return message.reply({
          content: "`<amount>` must be a number between 1 and 99!",
        });

      await message.channel.bulkDelete(+args[0] + 1).catch((err) => {
        return message.channel.send({
          content: `I was unable to delete the specified amount of messages\n${err}`,
        });
      });
      let content = `I have deleted ${args[0]} messages!`;
      if (+args[0] === 1) {
        content = `I have deleted ${args[0]} message!`;
      }
      message.channel
        .send({
          content: content,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
});
