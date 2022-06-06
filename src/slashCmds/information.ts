import { SlashCommand } from "../structures/SlashCommand";
import { ColorResolvable } from "discord.js";
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

    let embed: {};

    switch (subCommand) {
      case "donate":
        break;
      case "info-bot":
        const uptime = Duration.fromMillis(client.uptime)
          .shiftTo("days", "hours", "minutes", "seconds")
          .toFormat("d 'days', h 'hours', m 'minutes', s 'seconds'", {
            floor: true,
          });

        const serverCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        );
        const owner = client.users.cache.get(config.ownerId);

        if (!owner)
          return interaction.followUp({
            content: "❌ Sorry, an error has occurred!",
          });

        let namedCommands = 0;
        let totalCommands = 0;
        const cmdFiles = await globPromise(
          `${__dirname}/../modules/**/*{.ts,.js}`
        );
        await Promise.all(
          cmdFiles.map(async (filePath) => {
            const cmd: CommandType = await importFile(filePath);
            if (cmd?.name) namedCommands++;
            totalCommands++;
          })
        );

        embed = {
          author: {
            name: `${client.user.tag}`,
            icon_url: client.user.displayAvatarURL({ dynamic: true }),
          },
          fields: [
            {
              name: "Version",
              value: version,
              inline: true,
            },
            {
              name: "Library",
              value: "DiscordJS",
              inline: true,
            },
            {
              name: "Owner",
              value: owner.tag,
              inline: true,
            },
            {
              name: "Servers",
              value: `${serverCount}`,
              inline: true,
            },
            {
              name: "Users",
              value: `${userCount}`,
              inline: true,
            },
            {
              name: "Commands",
              value: `${namedCommands} of ${totalCommands}`,
              inline: true,
            },
            {
              name: "Invite",
              value: "[dsc.gg/miku-bot](https://dsc.gg/miku-invite)",
              inline: true,
            },
            {
              name: "Support",
              value: "[dsc.gg/miku-support](https://dsc.gg/mikusupport)",
              inline: true,
            },
          ],
          footer: {
            text: `Uptime: ${uptime}`,
          },
          color: color as ColorResolvable,
        };

        await interaction.followUp({
          embeds: [embed],
        });

        break;
      case "invite":
        embed = {
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
        await interaction.followUp({
          content: `🏓  **|**  Pong! - **WebSocket: ${client.ws.ping}ms**`,
        });
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

    async function importFile(filePath: string) {
      return (await import(filePath))?.default;
    }
  },
});
