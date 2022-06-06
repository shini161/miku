import { SlashCommand } from "../structures/SlashCommand";
import { ColorResolvable } from "discord.js";
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

  run: async ({ interaction }) => {
    const subCommand = interaction.options.getSubcommand();
    const query = interaction.options.getString("query");

    let res;
    let embed;
    const typesArray = [];
    let color = Colors.celestialBlue;

    switch (subCommand) {
      case "anime":
        res = await axios
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
        res = await axios
          .get(`https://kitsu.io/api/edge/manga?filter[text]-${query}`, {
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

        const manga = res?.data[0];
        embed = {
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
                      manga.attributes.endDate
                        ? manga.attributes.endDate
                        : "N/A"
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

        await interaction.followUp({
          embeds: [embed],
        });
        break;
      case "pokemon":
        res = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${query}`, {
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

        const { sprites, stats, weight, height, name, types } = res?.data[0];

        if (!name) return;

        embed = {
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

        stats.forEach((stat) =>
          embed.fields.push({
            name: `${
              stat.stat.name.charAt(0).toUpperCase() +
              stat.stat.name.slice(1).toLowerCase()
            }`,
            value: `${stat.base_stat ? stat.base_stat : "N/A"}`,
            inline: true,
          })
        );

        await interaction.followUp({
          embeds: [embed],
        });
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
