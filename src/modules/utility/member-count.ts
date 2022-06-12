import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../../assets/colors.json";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "membercount",
  aliases: ["member-count", "mcount", "m-count"],
  usages: "$PREFIX$membercount",
  cooldown: 1000 * 4,
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message }) => {
    const lang = await getLangGuild(message.guildId);
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
        `🔹 **${langs[lang].common.total}**: ${message.guild.memberCount}` +
        `\n🔹 **${langs[lang].common.users}**: ${humans}` +
        `\n🔹 **${langs[lang].common.bots}**: ${bots}`,
      timestamp: new Date(),
      color: color as ColorResolvable,
    };

    message.channel.send({
      embeds: [embed],
    });
  },
});
