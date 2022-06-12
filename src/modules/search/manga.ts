import { Command } from "../../structures/Command";
import Colors from "../../../assets/colors.json";
import axios from "axios";
import { ColorResolvable } from "discord.js";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "manga",
  aliases: ["search-manga"],
  usages: "$PREFIX$manga <search>",
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
          content: langs[lang].common.no_results,
        });
        return;
      });

    if (!res)
      return message.reply({
        content: langs[lang].common.no_results,
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
                    manga.attributes.endDate ? manga.attributes.endDate : "N/A"
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
            manga.attributes.volumeCount ? manga.attributes.volumeCount : "N/A"
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
  },
});
