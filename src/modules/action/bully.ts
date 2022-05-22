import { Command } from "../../structures/Command";
import ActionData from "../../assets/action-module.json";
import Colors from "../../assets/colors.json";
import { ColorResolvable } from "discord.js";

const name = "bully"; // command name
export default new Command({
  name,
  usages: `%PREFIX%${name} <@user>`,
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
        text = [`${message.author.username}, how can you bully yourself?`];
        return sendEmbed(text, images);
        break;
      default:
        text = [
          `${message.author.username} is bullying ${target.user.username}!`,
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
