import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../../assets/colors.json";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";
import axios from "axios";

export default new Command({
  name: "random",
  aliases: ["rand"],
  usages:
    "$PREFIX$random <types>\n" +
    "**Types**:\n- waifu/wa ~> to return a random waifu image.\n" +
    "- neko\ne ~> to return a random neko image." +
    "- number/numb ~> to return a random number.",
  cooldown: 1000 * 4,
  channel_type: "ALL",
  required: false,

  run: async ({ message, args }) => {
    const lang = await getLangRelative(message?.guildId, message.author.id);
    const color = Colors.celestialBlue;
    const query = args[0]?.toLowerCase();

    const waifuKeys = ["waifu", "wa"];
    const nekoKeys = ["neko", "ne"];
    const numberKeys = ["number", "numb"];

    if (!query)
      return message.reply({
        content: langs[lang].common.missing_arguments,
      });

    if (waifuKeys.includes(query)) {
      const image = await axios
        .get("https://neko-love.xyz/api/v1/waifu", {
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          responseType: "json",
        })
        .then((res) => res.data.url)
        .catch((err) => {
          message.reply({
            content: langs[lang].common.no_results,
          });
          return;
        });

      if (!image)
        return message.reply({
          content: langs[lang].common.no_results,
        });

      const embed = {
        title: langs[lang].modules.utility.random.waifu.embed.title,
        image: {
          url: image,
        },
        color: color as ColorResolvable,
      };
      return message.channel.send({
        embeds: [embed],
      });
    }
    if (nekoKeys.includes(query)) {
      const image = await axios
        .get("https://nekos.life/api/neko", {
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          responseType: "json",
        })
        .then((res) => res.data.neko)
        .catch(() => {
          message.reply({
            content: langs[lang].common.no_results,
          });
          return;
        });

      if (!image)
        return message.reply({
          content: langs[lang].common.no_results,
        });
      const embed = {
        title: langs[lang].modules.utility.random.neko.embed.title,
        image: {
          url: image,
        },
        color: color as ColorResolvable,
      };

      return message.channel.send({
        embeds: [embed],
      });
    }
    if (numberKeys.includes(query)) {
      if (!args[1] || (isNaN(+args[1]) && args[1].toLowerCase() !== "infinity"))
        return randNumber(100);
      return randNumber(+args[1]);

      function randNumber(max: number) {
        const number = Math.round(Math.random() * max);
        const embed = {
          title: langs[lang].modules.utility.random.number.embed.title(number),
          description: `${langs[lang].common.max}: ${max}`,
          color: color as ColorResolvable,
        };

        message.channel.send({
          embeds: [embed],
        });
      }
    }
    await message.reply({
      content: langs[lang].common.invalid_arguments,
    });
  },
});
