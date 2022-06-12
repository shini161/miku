import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../../assets/colors.json";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";
import { getUserId } from "../../utils/getStringID";
import reactOnDM from "../../utils/reactOnDM";

export default new Command({
  name: "avatar",
  aliases: ["pic", "pfp", "av"],
  usages: "$PREFIX$avatar [@user]\n$PREFIX$avatar [userID]",
  channel_type: "ALL",
  cooldown: 1000 * 8,
  required: false,

  run: async ({ client, message, args }) => {
    const color = Colors.celestialBlue;
    const lang = await getLangRelative(message?.guildId, message.author.id);
    const link_as = langs[lang].common.link_as;
    let id = getUserId(args?.[0], message.author.id);

    getAvatar(id);
    function getAvatar(id: string) {
      client.users
        .fetch(id)
        .then(async (user) => {
          const png = user.displayAvatarURL({ format: "png" });
          const jpg = user.displayAvatarURL({ format: "jpg" });
          const webp = user.displayAvatarURL({ format: "webp" });

          const embed = {
            author: {
              name: `${user.tag}`,
              icon_url: user.displayAvatarURL({ dynamic: true }),
            },
            title: "Avatar",
            description: `**${link_as}:\n[png](${png}) | [jpg](${jpg}) | [webp](${webp})**`,
            image: {
              url: user.displayAvatarURL({ dynamic: true, size: 512 }),
            },
            color: color as ColorResolvable,
          };
          if (message.guild) {
            return reactOnDM(message, { embeds: [embed] });
          }
          return message.channel.send({
            embeds: [embed],
          });
        })
        .catch(() => {
          return message.reply({
            content: langs[lang].common.user_not_found,
          });
        });
    }
  },
});
