import { SlashCommand } from "../structures/SlashCommand";
import { ColorResolvable } from "discord.js";
import ActionData from "../../assets/action-module.json";
import Colors from "../../assets/colors.json";
import axios from "axios";
import ytsearch from "yt-search";

export default new SlashCommand({
  name: "search",
  description: "to search something",
  channel_type: "GUILD_ONLY",
  options: [
    {
      name: "anime",
      type: "SUB_COMMAND",
      description: "to get info about an anime",
      options: [
        {
          name: "query",
          type: "STRING",
          description: "to specify the anime to search",
          required: true,
        },
      ],
    },

    {
      name: "manga",
      type: "SUB_COMMAND",
      description: "to get info about a manga",
      options: [
        {
          name: "query",
          type: "STRING",
          description: "to specify the manga to search",
          required: true,
        },
      ],
    },

    {
      name: "pokemon",
      type: "SUB_COMMAND",
      description: "to get info about a pokemon",
      options: [
        {
          name: "query",
          type: "STRING",
          description: "to specify the pokemon to search",
          required: true,
        },
      ],
    },

    {
      name: "urban",
      type: "SUB_COMMAND",
      description: "to get info about a word",
      options: [
        {
          name: "query",
          type: "STRING",
          description: "to specify the word to search",
          required: true,
        },
      ],
    },

    {
      name: "youtube",
      type: "SUB_COMMAND",
      description: "to search a youtube video",
      options: [
        {
          name: "query",
          type: "STRING",
          description: "to specify the youtube video to search",
          required: true,
        },
      ],
    },
  ],

  run: async ({ client, interaction, args }) => {
    const subCommand = interaction.options.getSubcommand();
    const query = interaction.options.getString("query");

    let res;
    let embed: {};
    let color = Colors.celestialBlue;

    switch (subCommand) {
      case "anime":
        await axios
          .get(`https://kitsu.io/api/edge/anime?filter[text]-${query}`, {
            method: "GET",
            headers: {
              "Content-type": "application/vnd.api+json",
              Accept: "application/vnd.api+json",
            },
            responseType: "json",
          })
          .catch(() => {
            interaction.followUp({
              content: "No results were found!",
            });
            return;
          });

        const anime = res?.data[0];
        embed = {
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
                      anime.attributes.endDate
                        ? anime.attributes.endDate
                        : "N/A"
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

        await interaction.followUp({
          embeds: [embed],
        });
        break;
      case "manga":
        break;
      case "pokemon":
        break;
      case "urban":
        break;
      case "youtube":
        break;
      default:
        await interaction.followUp({
          content: "❌ Sorry, an error has occurred!",
        });
    }
  },
});
