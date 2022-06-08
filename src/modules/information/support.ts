import { Command } from "../../structures/Command";
import { Permissions, GuildChannelResolvable } from "discord.js";
import Emojis from "../../../assets/emojis.json";
import getLangUser from "../../utils/getLang-user";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "support",
  usages: "$PREFIX$support",
  required: false,

  run: async ({ message }) => {
    try {
      const { greenTick, redTick, greenTickCustom, redTickCustom } = Emojis;
      const invite = "https://discord.gg/DdT3ncvcgh";
      const lang = await getLangUser(message.author.id);
      const content = langs[lang].modules.information.support.content(invite);

      if (
        message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.SEND_MESSAGES) ||
        message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return message.reply({
          content,
        });

      await sendDM();
      function sendDM() {
        let trigger = true;
        message.author
          .send({
            content,
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
