import { Command } from "../../structures/Command";
import ActionData from "../../../assets/action-module.json";
import Colors from "../../../assets/colors.json";
import { ColorResolvable } from "discord.js";

const name = "lick"; // command name
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
        text = [`${message.author.username} is licking things...`];
        sendEmbed(text, images);
        break;
      case message.author.id:
        text = [`${message.author.username}, are you a cat?`];
        images = [
          "https://media1.tenor.com/images/2834a92a3631f54354c49ec0bf7b7c1d/tenor.gif",
        ];
        sendEmbed(text, images);
        break;
      default:
        text = [
          `${message.author.username} is licking ${target.user.username}.`,
          `${message.author.username} licks ${target.user.username}.`,
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
