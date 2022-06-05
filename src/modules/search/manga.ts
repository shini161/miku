import { Command } from "../../structures/Command";
import Colors from "../../../assets/colors.json";
import axios from "axios";
import { ColorResolvable } from "discord.js";
import getPrefix from "../../utils/getPrefix";

export default new Command({
  name: "manga",
  aliases: ["search-manga"],
  usages: "$PREFIX$manga <search>",
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
            value: `${prefix}manga <search>`,
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
          .get(`https://kitsu.io/api/edge/manga?filter[text]-${query}`, {
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

      const manga = res.data[0];
      const embed = {
        title: `${manga.attributes.titles.en_jp}`,
        url: `${manga.links.self}`,
        thumbnail: {
          url: manga.attributes.posterImage.original,
        },
        description: manga.attributes.synopsis,
        fields: [
          {
            name: "⏳ Status",
            value: manga.attributes.status,
            inline: true,
          },
          {
            name: "🗂 Type",
            value: manga.type,
            inline: true,
          },
          {
            name: "🗓️ Aired",
            value:
                manga.attributes.startDate && manga.attributes.endDate
                    ? manga.attributes.startDate == manga.attributes.endDate
                        ? `**${manga.attributes.startDate}**`
                        : `From **${
                            manga.attributes.startDate
                                ? manga.attributes.startDate
                                : "N/A"
                        }** to **${
                            manga.attributes.endDate
                                ? manga.attributes.endDate
                                : "N/A"
                        }**`
                    : `From **${
                        manga.attributes.startDate
                            ? manga.attributes.startDate
                            : "N/A"
                    }** to **${
                        manga.attributes.endDate ? manga.attributes.endDate : "N/A"
                    }**`,
            inline: false,
          },
          {
            name: "📰 Chapters",
            value: `${
                manga.attributes.chapterCount
                    ? manga.attributes.chapterCount
                    : "N/A"
            }`,
            inline: true,
          },
          {
            name: "📚 Volumes",
            value: `${
                manga.attributes.volumeCount
                    ? manga.attributes.volumeCount
                    : "N/A"
            }`,
            inline: true,
          },
          {
            name: "⭐ Average Rating",
            value: `${
                manga.attributes.averageRating
                    ? manga.attributes.averageRating
                    : "N/A"
            }`,
            inline: true,
          },
          {
            name: "🏆 Rank",
            value: `${
                manga.attributes.ratingRank
                    ? "**TOP " + manga.attributes.ratingRank + "**"
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
