import { Command } from "../../structures/Command";
import ActionData from "../../../assets/action-module.json";
import Colors from "../../../assets/colors.json";
import { ColorResolvable } from "discord.js";

const name = "kiss"; // command name
export default new Command({
  name,
  usages: `$PREFIX$${name} [@user]`,
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({message}) => {
    let text: string[];
    let images = ActionData[name].images;
    const color = Colors.celestialBlue;
    const target = message.mentions.members.first();

    switch (target?.id) {
      case undefined:
        text = [
          `${message.author.username} needs a kiss!`,
          `${message.author.username} wants to be kissed by someone.`,
        ];
        sendEmbed(text, images);
        break;
      case message.author.id:
        text = [`${message.author.username}, how can you kiss yourself?`];
        images = [
          "https://media1.tenor.com/images/72bfd912fa78d4ea2337c8b62ab3e899/tenor.gif",
        ];
        sendEmbed(text, images);
        break;
      default:
        text = [
          `${message.author.username} kissed ${target.user.username}!`,
          `${message.author.username} is kissing ${target.user.username}!`,
        ];
        sendEmbed(text, images);
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
