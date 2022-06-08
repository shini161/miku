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
import getLangUser from "../utils/getLang-user";
import langs from "../../assets/langs/langs";

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
    const lang = await getLangUser(interaction.user.id);
    const timeTypes = langs[lang].common.timeTypes;

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
          .toFormat(
            `d '${timeTypes.days}', h '${timeTypes.hours}', m '${timeTypes.minutes}', s '${timeTypes.seconds}'`,
            {
              floor: true,
            }
          );

        const serverCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        );
        const owner = client.users.cache.get(config.ownerId);

        if (!owner)
          return interaction.followUp({
            content: langs[lang].common.errorOccurred,
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
              name: langs[lang].common.version,
              value: version,
              inline: true,
            },
            {
              name: langs[lang].common.library,
              value: "DiscordJS",
              inline: true,
            },
            {
              name: langs[lang].common.owner,
              value: owner.tag,
              inline: true,
            },
            {
              name: langs[lang].common.servers,
              value: `${serverCount}`,
              inline: true,
            },
            {
              name: langs[lang].common.users,
              value: `${userCount}`,
              inline: true,
            },
            {
              name: langs[lang].common.commands,
              value: `${namedCommands} of ${totalCommands}`,
              inline: true,
            },
            {
              name: langs[lang].common.invite,
              value: "[dsc.gg/miku-bot](https://dsc.gg/miku-invite)",
              inline: true,
            },
            {
              name: langs[lang].common.support,
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
          title: langs[lang].modules.information.invite.embed.title,
          description:
            langs[lang].modules.information.invite.embed.description(botInvite),
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
          content:
            langs[lang].modules.information.support.content(supportInvite),
        });
        break;
      default:
        await interaction.followUp({
          content: langs[lang].common.errorOccurred,
        });
    }

    async function importFile(filePath: string) {
      return (await import(filePath))?.default;
    }
  },
});
