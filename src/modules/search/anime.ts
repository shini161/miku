import { Command } from "../../structures/Command";
import Colors from "../../../assets/colors.json";
import axios from "axios";
import { ColorResolvable } from "discord.js";
import getPrefix from "../../utils/getPrefix";

export default new Command({
  name: "anime",
  aliases: ["search-anime"],
  usages: "$PREFIX$anime <search>",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = await getPrefix(message.guildId);
      const color = Colors.celestialBlue;
      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}anime <search>`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      const query = args.join(" ");

      if (!query)
        return message.reply({
          embeds: [syntaxError],
        });

      const res = await axios
        .get(`https://kitsu.io/api/edge/anime?filter[text]-${query}`, {
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          responseType: "json",
        })
        .catch(() => {
          message.reply({
            content: "No results were found!",
          });
          return;
        });

      if (!res)
        return message.reply({
          content: "No results were found!",
        });

      const anime = res?.data[0];
      const embed = {
        title: `${anime.attributes.titles.en_jp}`,
        url: `${anime.links.self}`,
        thumbnail: {
          url: anime.attributes.posterImage.original,
        },
        description: anime.attributes.synopsis,
        fields: [
          {
            name: "⏳ Status",
            value: anime.attributes.status,
            inline: true,
          },
          {
            name: "🗂 Type",
            value: anime.attributes.showType,
            inline: true,
          },
          {
            name: "🗓️ Aired",
            value:
              anime.attributes.startDate && anime.attributes.endDate
                ? anime.attributes.startDate == anime.attributes.endDate
                  ? `**${anime.attributes.startDate}**`
                  : `From **${
                      anime.attributes.startDate
                        ? anime.attributes.startDate
                        : "N/A"
                    }** to **${
                      anime.attributes.endDate
                        ? anime.attributes.endDate
                        : "N/A"
                    }**`
                : `From **${
                    anime.attributes.startDate
                      ? anime.attributes.startDate
                      : "N/A"
                  }** to **${
                    anime.attributes.endDate ? anime.attributes.endDate : "N/A"
                  }**`,
            inline: false,
          },
          {
            name: "💽 Total Episodes",
            value: `${
              anime.attributes.episodeCount
                ? anime.attributes.episodeCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "⏱ Duration",
            value: `${
              anime.attributes.episodeLength
                ? anime.attributes.episodeLength
                : "N/A"
            } Min`,
            inline: true,
          },
          {
            name: "⭐ Average Rating",
            value: `${
              anime.attributes.averageRating
                ? anime.attributes.averageRating
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "🏆 Rank",
            value: `${
              anime.attributes.ratingRank
                ? "**TOP " + anime.attributes.ratingRank + "**"
                : "N/A"
            }`,
            inline: true,
          },
        ],
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
