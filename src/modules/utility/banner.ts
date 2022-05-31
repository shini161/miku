import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "banner",
  usages: "$PREFIX$banner [@user]\n$PREFIX$banner [userID]",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const color = Colors.celestialBlue;
      let id = message.author.id;

      if (args[0]) {
        if (
          args[0].startsWith("<@") &&
          args[0].endsWith(">") &&
          args[0].length == 21 &&
          !isNaN(+args[0].slice(2, 20))
        )
          id = args[0].slice(2, 20);
        if (
          args[0].startsWith("<@!") &&
          args[0].endsWith(">") &&
          args[0].length == 22 &&
          !isNaN(+args[0].slice(3, 21))
        )
          id = args[0].slice(3, 21);
        if (!isNaN(+args[0]) && args[0].length === 18) id = args[0];
      }

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
                description: `**Link as:\n[png](${png}) | [jpg](${jpg}) | [webp](${webp})**`,
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
              description: "That user doesn't have a banner.",
              color: color as ColorResolvable,
            };
            message.channel.send({
              embeds: [embed],
            });
          })
          .catch(() => {
            return message.reply({
              content: "I couldn't find that user!",
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
