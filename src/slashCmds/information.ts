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

  run: async ({ client, interaction, args }) => {},
});
