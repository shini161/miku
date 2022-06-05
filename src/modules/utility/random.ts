/*
import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import { get } from "request-promise-native";
import Colors from "../../../assets/colors.json";
import config from "../../config.json";

export default new Command({
  name: "random",
  aliases: ["rand"],
  usages:
    "$PREFIX$random <type>\n\n" +
    "**Types**:\n- waifu/wa/w => Sends a random waifu image.\n" +
    "neko/ne => Sends a random neko image.\n" +
    "number/num/n => Sends a random number.",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = config.prefix;
      const color = Colors.celestialBlue;
      const query = args[0]?.toLowerCase();

      const waifuArray = ["waifu", "wa", "w"];
      const nekoArray = ["neko", "ne"];
      const numberArray = ["number", "num", "n"];

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value:
              `${prefix}random <type> \n${prefix}rand <type> \n\n**Types**:` +
              `\nwaifu/wa/w => Sends a random waifu image. \nneko/ne => Sends a random neko image.` +
              `\nnumber/num/n => Sends a random number.`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      if (!query)
        return message.reply({
          embeds: [syntaxError],
        });

      if (waifuArray.includes(query)) {
        const option = {
          url: `https://neko-love.xyz/api/v1/waifu`,
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          json: true,
        };
        const image = await get(option)
          .then((res) => res.url)
          .catch(() => {
            return message.reply({
              content: "No results were found!",
            });
          });
        if (!image)
          return message.reply({
            content: "No results were found!",
          });

        const embed = {
          title: "Random Waifu",
          image: {
            url: image,
          },
          color: color as ColorResolvable,
        };

        return message.channel.send({
          embeds: [embed],
        });
      }
      if (nekoArray.includes(query)) {
        const option = {
          url: `https://nekos.life/api/neko`,
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          json: true,
        };

        const image = await get(option)
          .then((res) => res.neko)
          .catch(() => {
            return message.reply({
              content: "No results were found!",
            });
          });
        if (!image)
          return message.reply({
            content: "No results were found!",
          });

        const embed = {
          title: "Random Neko",
          image: {
            url: image,
          },
          color: color as ColorResolvable,
        };

        return message.channel.send({
          embeds: [embed],
        });
      }
      if (numberArray.includes(query)) {
        if (args[1]) {
          if (isNaN(+args[1]) || args[1].toLowerCase() === "infinity")
            return randNumber(100);
          return randNumber(+args[1]);
        }
        return randNumber(100);
      }
      message.reply({
        embeds: [syntaxError],
      });

      function randNumber(max: number) {
        const number = Math.round(Math.random() * max) + 0;
        const embed = {
          title: `Your random number is: ${number}`,
          description: `Max: ${max}`,
          color: color as ColorResolvable,
        };

        return message.channel.send({
          embeds: [embed],
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
*/