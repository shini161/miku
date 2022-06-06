import { SlashCommand } from "../structures/SlashCommand";
import { ColorResolvable } from "discord.js";
import ActionData from "../../assets/action-module.json";
import Colors from "../../assets/colors.json";

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
    const target = interaction.options.getString("query");
  },
});
