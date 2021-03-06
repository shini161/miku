import { Command } from "../../structures/Command";
import Colors from "../../../assets/colors.json";
import axios from "axios";
import { ColorResolvable } from "discord.js";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "pokemon",
  aliases: ["search-anime"],
  usages: "$PREFIX$pokemon <search>",
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message, args }) => {
    const color = Colors.celestialBlue;
    const lang = await getLangGuild(message.guildId);

    if (!args[0])
      return message.reply({
        content: langs[lang].common.missing_arguments,
      });

    try {
      const query = args[0].toLowerCase();

      const res = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${query}`, {
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          responseType: "json",
        })
        .then((res) => res.data);

      if (!res)
        return message.reply({
          content: langs[lang].common.no_results,
        });

      const typesArray = [];
      const { sprites, stats, weight, height, name, types } = res;

      if (!name) return;

      const embed = {
        title: `${
          name.charAt(0).toUpperCase() +
          (name.length > 0 ? name.slice(1).toLowerCase() : "")
        }`,
        fields: [
          {
            name: "⚖ Weight",
            value: `${weight ? weight : "N/A"}`,
            inline: true,
          },
          {
            name: "📐 Height",
            value: `${height ? height : "N/A"}`,
            inline: true,
          },
        ],
        thumbnail: {
          url: sprites.front_default ? `${sprites.front_default}` : null,
        },
        color: color as ColorResolvable,
      };
      const typesField = {
        name: "🗂 Types",
        value: "",
        inline: false,
      };

      types.forEach((type: any) => typesArray.push(`${type.type.name}`));
      if (typesArray.length > 0) {
        if (typesArray.length > 1) {
          typesField.value = `${
            typesArray[0].charAt(0).toUpperCase() +
            typesArray[0].slice(1).toLowerCase() +
            ", " +
            typesArray.slice(1).join(", ")
          }`;
        } else {
          typesField.value = `${
            typesArray[0].charAt(0).toUpperCase() +
            typesArray[0].slice(1).toLowerCase()
          }`;
        }
        embed.fields.push(typesField);
      }

      stats.forEach((stat: any) =>
        embed.fields.push({
          name: `${
            stat.stat.name.charAt(0).toUpperCase() +
            stat.stat.name.slice(1).toLowerCase()
          }`,
          value: `${stat.base_stat ? stat.base_stat : "N/A"}`,
          inline: true,
        })
      );

      message.channel.send({
        embeds: [embed],
      });
    } catch (err) {
      await message.reply({
        content: langs[lang].common.no_results,
      });
      console.log(err);
    }
  },
});
