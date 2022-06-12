import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../../assets/colors.json";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";
import { getUserId } from "../../utils/getStringID";
import reactOnDM from "../../utils/reactOnDM";

export default new Command({
  name: "banner",
  usages: "$PREFIX$banner [@user]\n$PREFIX$banner [userID]",
  channel_type: "ALL",
  cooldown: 1000 * 4,
  required: false,

  run: async ({ client, message, args }) => {
    const color = Colors.celestialBlue;
    const lang = await getLangRelative(message?.guildId, message.author.id);
    const link_as = langs[lang].common.link_as;
    let id = getUserId(args?.[0], message.author.id);

    getBanner(id);
    function getBanner(id: string) {
      client.users
        .fetch(id)
        .then(async (user) => {
          const target = await user.fetch();
          const png = target.bannerURL({ format: "png" });
          const jpg = target.bannerURL({ format: "jpg" });
          const webp = target.bannerURL({ format: "webp" });

          if (target.banner) {
            const embed = {
              author: {
                name: `${target.tag}`,
                icon_url: target.displayAvatarURL({ dynamic: true }),
              },
              title: "Banner",
              description: `**${link_as}:\n[png](${png}) | [jpg](${jpg}) | [webp](${webp})**`,
              image: {
                url: target.bannerURL({ dynamic: true, size: 4096 }),
              },
              color: color as ColorResolvable,
            };
            return message.channel.send({
              embeds: [embed],
            });
          }
          const embed = {
            author: {
              name: `${target.tag}`,
              icon_url: target.displayAvatarURL({ dynamic: true }),
            },
            description: langs[lang].modules.utility.banner.no_banner,
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
