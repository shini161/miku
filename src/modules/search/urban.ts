import { Command } from "../../structures/Command";
import Colors from "../../../assets/colors.json";
import { ColorResolvable } from "discord.js";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";
import urban from "relevant-urban";

export default new Command({
  name: "urban",
  aliases: ["search-urban"],
  usages: "$PREFIX$ <search>",
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message, args }) => {
    const color = Colors.celestialBlue;
    const lang = await getLangGuild(message.guildId);

    const query = args.join(" ");

    if (!query)
      return message.reply({
        content: langs[lang].common.missing_arguments,
      });

    try {
      const res = await urban(query);

      const embed = {
        title: res.word,
        url: res.urbanURL,
        description: res.definition,
        fields: [
          {
            name: langs[lang].common.example,
            value: `*${res.example}*`,
          },
        ],
        footer: {
          text: `👍 ${res.thumbsUp} | 👎 ${res.thumbsDown} | ✍ ${res.author}`,
        },
        color: color as ColorResolvable,
      };

      message.channel.send({
        embeds: [embed],
      });
    } catch (err) {
      return message.reply({
        content: langs[lang].common.no_results,
      });
    }
  },
});
