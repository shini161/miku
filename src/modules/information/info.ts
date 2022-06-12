import { Command } from "../../structures/Command";
import {
  Permissions,
  ColorResolvable,
  GuildChannelResolvable,
} from "discord.js";
import { CommandType } from "../../typings/Command";
import { Duration } from "luxon";
import Emojis from "../../../assets/emojis.json";
import glob from "glob";
import { promisify } from "util";
import Colors from "../../../assets/colors.json";
import config from "../../config.json";
import { version } from ".././../../package.json";
import getLangUser from "../../utils/getLang-user";
import langs from "../../../assets/langs/langs";
import reactOnDM from "../../utils/reactOnDM";

const globPromise = promisify(glob);

export default new Command({
  name: "info",
  aliases: ["info-bot", "infobot"],
  usages: "$PREFIX$info",
  channel_type: "ALL",
  required: false,

  run: async ({ client, message }) => {
    const color = Colors.celestialBlue;
    const lang = await getLangUser(message.author.id);
    const timeTypes = langs[lang].common.timeTypes;
    const { greenTick, redTick, greenTickCustom, redTickCustom } = Emojis;
    const uptime = Duration.fromMillis(client.uptime)
      .shiftTo("days", "hours", "minutes", "seconds")
      .toFormat(
        `d '${timeTypes.days}', h '${timeTypes.hours}', m '${timeTypes.minutes}', s '${timeTypes.seconds}'`,
        {
          floor: true,
        }
      )
      .toLowerCase();

    const serverCount = client.guilds.cache.size;
    const userCount = client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );
    const owner = client.users.cache.get(config.ownerId);

    if (!owner)
      return message.reply({
        content: langs?.[lang].common.errorOccurred,
      });

    let namedCommands = 0;
    let totalCommands = 0;
    const cmdFiles = await globPromise(`${__dirname}/../**/*{.ts,.js}`);
    await Promise.all(
      cmdFiles.map(async (filePath) => {
        const cmd: CommandType = await importFile(filePath);
        if (cmd?.name) namedCommands++;
        totalCommands++;
      })
    );

    let embed = {
      author: {
        name: `${client.user.tag}`,
        icon_url: client.user.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: langs?.[lang].common.version,
          value: version,
          inline: true,
        },
        {
          name: langs?.[lang].common.library,
          value: "DiscordJS",
          inline: true,
        },
        {
          name: langs?.[lang].common.owner,
          value: owner.tag,
          inline: true,
        },
        {
          name: langs?.[lang].common.servers,
          value: `${serverCount}`,
          inline: true,
        },
        {
          name: langs?.[lang].common.users,
          value: `${userCount}`,
          inline: true,
        },
        {
          name: langs?.[lang].common.commands,
          value: `${namedCommands} of ${totalCommands}`,
          inline: true,
        },
        {
          name: langs?.[lang].common.invite,
          value: "[dsc.gg/miku-bot](https://dsc.gg/miku-invite)",
          inline: true,
        },
        {
          name: langs?.[lang].common.support,
          value: "[dsc.gg/miku-support](https://dsc.gg/mikusupport)",
          inline: true,
        },
      ],
      footer: {
        text: `Uptime: ${uptime}`,
      },
      color: color as ColorResolvable,
    };

    if (message.guild) {
      if (
        message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.SEND_MESSAGES) ||
        message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          embeds: [embed],
        });
      await sendDM();
    } else
      await message
        .reply({
          embeds: [embed],
        })
        .catch(() => {
          return;
        });

    function sendDM() {
      let trigger = true;
      message.author
        .send({
          embeds: [embed],
        })
        .catch(() => {
          trigger = false;
        });
      if (
        message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.ADD_REACTIONS)
      ) {
        if (
          message.guild.me
            .permissionsIn(message.channel as GuildChannelResolvable)
            .has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)
        ) {
          if (trigger) return message.react(greenTickCustom);
          return message.react(redTickCustom);
        }
        if (trigger) return message.react(greenTick);
        message.react(redTick);
      }
    }

    async function importFile(filePath: string) {
      return (await import(filePath))?.default;
    }
  },
});
