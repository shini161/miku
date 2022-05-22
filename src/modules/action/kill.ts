import { Command } from "../../structures/Command";
import ActionData from "../../assets/action-module.json";
import Colors from "../../assets/colors.json";
import { ColorResolvable } from "discord.js";

const name = "kill"; // command name
export default new Command({
  name,
  usages: `%PREFIX%${name} [@user]`,
  required: true,

  run: async ({ client, message, args }) => {
    let text: string[];
    let images: string[] = ActionData[name].images;
    const color = Colors.celestialBlue;
    const target = message.mentions.members.first();

    switch (target?.id) {
      case undefined:
        return message.reply({
          content: "Please mention a user!",
        });
        break;
      case message.author.id:
        text = [`${message.author.username}, don't kill yourself!`];
        return sendEmbed(text, images);
        break;
      default:
        text = [
          `${message.author.username} killed ${target.user.username}!`,
          `${message.author.username} is killing ${target.user.username}!`,
        ];
        return sendEmbed(text, images);
    }

    function sendEmbed(text: string[], images: string[]) {
      const embed = {
        author: {
          name: text[Math.floor(Math.random() * text.length)],
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
        image: {
          url: images[Math.floor(Math.random() * images.length)],
        },
        color: color as ColorResolvable,
      };

      message.channel.send({
        embeds: [embed],
      });
    }
  },
});
