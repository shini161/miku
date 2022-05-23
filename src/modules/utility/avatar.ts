import { Command } from "../../structures/Command";
import {
  Permissions,
  ColorResolvable,
  GuildChannelResolvable,
} from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "avatar",
  aliases: ["pic", "pfp", "av"],
  usages: "$PREFIX$avatar [@user]\n$PREFIX$avatar [userID]",

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

      getAvatar(id);
      function getAvatar(id: string) {
        client.users
          .fetch(id)
          .then((user) => {
            const png = user.displayAvatarURL({ format: "png" });
            const jpg = user.displayAvatarURL({ format: "jpg" });
            const webp = user.displayAvatarURL({ format: "webp" });

            const embed = {
              author: {
                name: `${user.tag}`,
                icon_url: user.displayAvatarURL({ dynamic: true }),
              },
              title: "Avatar",
              description: `**Link as:\n[png](${png}) | [jpg](${jpg}) | [webp](${webp})**`,
              image: {
                url: user.displayAvatarURL({ dynamic: true, size: 512 }),
              },
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
