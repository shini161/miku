import { SlashCommand } from "../structures/SlashCommand";
import {
  Permissions,
  ColorResolvable,
  GuildChannelResolvable,
} from "discord.js";
import ActionData from "../../assets/action-module.json";
import { CommandType } from "../typings/Command";
import { Duration } from "luxon";
import Emojis from "../../assets/emojis.json";
import glob from "glob";
import { promisify } from "util";
import Colors from "../../assets/colors.json";
import config from "../config.json";
import { version } from ".././../package.json";

const globPromise = promisify(glob);

export default new SlashCommand({
  name: "information",
  description: "information module",
  options: [
    {
      name: "donate",
      type: "SUB_COMMAND",
      description: "to donate and support us",
    },
    {
      name: "info-bot",
      type: "SUB_COMMAND",
      description: "to get some info about the bot",
    },
    {
      name: "invite",
      type: "SUB_COMMAND",
      description: "to invite the bot",
    },
    {
      name: "links",
      type: "SUB_COMMAND",
      description: "to get a list of useful links",
    },
    {
      name: "patreon",
      type: "SUB_COMMAND",
      description: "to donate and support us by patreon",
    },
    {
      name: "ping",
      type: "SUB_COMMAND",
      description: "to return the bot and the websocket latency",
    },
    {
      name: "support",
      type: "SUB_COMMAND",
      description: "to get support with the bot",
    },
  ],

  run: async ({ client, interaction, args }) => {
    const subCommand = interaction.options.getSubcommand();

    const color = Colors.celestialBlue;
    const { greenTick, redTick, greenTickCustom, redTickCustom } = Emojis;
    const botInvite =
      "https://discord.com/api/oauth2/authorize?client_id=841706730828333117&permissions=141636791750&scope=applications.commands%20bot";
    const supportInvite = "https://discord.gg/DdT3ncvcgh";

    switch (subCommand) {
      case "donate":
        break;
      case "info-bot":
        break;
      case "invite":
        const embed = {
          title: "Do you want to invite me?",
          description: `Click [here](${botInvite}) to invite me to your server!`,
          color: color as ColorResolvable,
        };

        await interaction.followUp({
          embeds: [embed],
        });
        break;
      case "links":
        break;
      case "patreon":
        break;
      case "ping":
        break;
      case "support":
        await interaction.followUp({
          content: `Do you need help with the bot?\nJoin our support server: ${supportInvite}`,
        });
        break;
      default:
        await interaction.followUp({
          content: "❌ Sorry, an error has occurred!",
        });
    }
  },
});
