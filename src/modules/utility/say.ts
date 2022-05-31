import { Command } from "../../structures/Command";
import { GuildChannelResolvable, Permissions } from "discord.js";
import Colors from "../../assets/colors.json";
import config from "../../assets/config.json";

export default new Command({
  name: "say",
  usages: "$PREFIX$say <text>",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = config.prefix;

      const authorButton = {
        type: 1,
        components: [
          {
            type: 2,
            label: `${message.author.tag}`,
            style: 2,
            disabled: true,
            custom_id: "SAY_CMD_MESSAGE_AUTHOR",
          },
        ],
      };

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}say <text>`,
          },
        ],
        colors: Colors.celestialBlue,
      };

      const text = args.join(" ");
      if (!text)
        return message.reply({
          embeds: [syntaxError],
        });
      const content = text.length >= 512 ? text.slice(0, 512) + "..." : text;

      message.channel.send({
        content,
        allowedMentions: { parse: [] },
        components: [authorButton],
      });

      if (
        message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.MANAGE_MESSAGES) ||
        message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        message.delete().catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
});
