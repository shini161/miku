import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import translate from "@iamtraction/google-translate";
import Colors from "../../../assets/colors.json";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "translate",
  usages: "$PREFIX$translate <text>",
  cooldown: 1000 * 4,
  channel_type: "ALL",
  required: false,

  run: async ({ message, args }) => {
    const lang = await getLangRelative(message?.guildId, message.author.id);
    const color = Colors.celestialBlue;
    const query = args.join(" ").toLowerCase();

    if (!query)
      return message.reply({
        content: langs[lang].common.missing_arguments,
      });

    const text = await translate(query, { to: "en" }).then((res) => {
      if (res.text.length >= 512) return res.text.slice(0, 512) + "...";
      return res.text.slice(0, 512);
    });

    const embed = {
      title: langs[lang].modules.utility.translate.embed.title,
      description: text,
      color: color as ColorResolvable,
    };

    message.channel.send({
      embeds: [embed],
    });
  },
});
