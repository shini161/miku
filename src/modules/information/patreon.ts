import { Command } from "../../structures/Command";
import Colors from "../../../assets/colors.json";
import getLangUser from "../../utils/getLang-user";
import langs from "../../../assets/langs/langs";
import Emojis from "../../../assets/emojis.json";
import {
  ColorResolvable,
  GuildChannelResolvable,
  Permissions,
} from "discord.js";

export default new Command({
  name: "patreon",
  usages: "$PREFIX$patreon",
  channel_type: "ALL",
  required: false,

  run: async ({ message }) => {
    const color = Colors.celestialBlue;
    const lang = await getLangUser(message.author.id);
    const { greenTick, redTick, greenTickCustom, redTickCustom } = Emojis;

    const embed = {
      title: langs[lang].modules.information.patreon.embed.title,
      description: langs[lang].modules.information.patreon.embed.description(
        "https://www.patreon.com/"
      ),
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
          if (trigger) {
            return message.react(greenTickCustom);
          }
          return message.react(redTickCustom);
        }
        if (trigger) {
          return message.react(greenTick);
        }
        return message.react(redTick);
      }
    }
  },
});
