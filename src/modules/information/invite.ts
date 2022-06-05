import { Command } from "../../structures/Command";
import {
  Permissions,
  ColorResolvable,
  GuildChannelResolvable,
} from "discord.js";
import Emojis from "../../../assets/emojis.json";
import Colors from "../../../assets/colors.json";

export default new Command({
  name: "invite",
  usages: "$PREFIX$invite",
  required: true,

  run: async ({message}) => {
    try {
      const color = Colors.celestialBlue;
      const { greenTick, redTick, greenTickCustom, redTickCustom } = Emojis;
      const invite =
        "https://discord.com/api/oauth2/authorize?client_id=841706730828333117&permissions=141636791750&scope=applications.commands%20bot";

      const embed = {
        title: "Do you want to invite me?",
        description: `Click [here](${invite}) to invite me to your server!`,
        color: color as ColorResolvable,
      };

      if (
        message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.SEND_MESSAGES) ||
        message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          embeds: [embed],
        });

      return sendDM();
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
    } catch (err) {
      console.log(err);
    }
  },
});
