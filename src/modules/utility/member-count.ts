import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "membercount",
  aliases: ["member-count", "mcount", "m-count"],
  usages: "$PREFIX$membercount",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const color = Colors.celestialBlue;
      const bots = message.guild.members.cache.filter(
        (member) => member.user.bot
      ).size;
      const humans = message.guild.memberCount - bots;

      const embed = {
        author: {
          name: `${message.guild.name}`,
          icon_url: message.guild.iconURL({ dynamic: true }),
        },
        description:
          `🔹 **Total**: ${message.guild.memberCount}` +
          `\n🔹 **Users**: ${humans}` +
          `\n🔹 **Bots**: ${bots}`,
        timestamp: new Date(),
        color: color as ColorResolvable,
      };

      message.channel.send({
        embeds: [embed],
      });
    } catch (err) {
      console.log(err);
    }
  },
});
