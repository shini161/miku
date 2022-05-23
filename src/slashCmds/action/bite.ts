import { SlashCommand } from "../../structures/SlashCmds";
import ActionData from "../../assets/action-module.json";
import Colors from "../../assets/colors.json";
import { ColorResolvable } from "discord.js";

const name = "bite"; // command name
export default new SlashCommand({
  name,
  description: "to bite someone",
  options: [
    {
      name: "target",
      description: "to select the target",
      type: 2,
      required: false,
    },
  ],

  run: async ({ interaction, client, args }) => {
    let text: string[];
    let images: string[] = ActionData[name].images;
    const color = Colors.celestialBlue;
    const target = args[0];

    switch (target?.id) {
      case undefined:
        text = [
          `${interaction.user.username} wants to bite something.`,
          `${interaction.user.username} needs to bite something.`,
        ];
        sendEmbed(text, images);
        break;
      case interaction.user.id:
        text = [`${interaction.user.username}, don't bite yourself!`];
        sendEmbed(text, images);
        break;
      default:
        text = [
          `${interaction.user.username} is biting ${target.user.username}.`,
        ];
        sendEmbed(text, images);
    }

    function sendEmbed(text: string[], images: string[]) {
      const embed = {
        author: {
          name: text[Math.floor(Math.random() * text.length)],
          icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
        },
        image: {
          url: images[Math.floor(Math.random() * images.length)],
        },
        color: color as ColorResolvable,
      };

      interaction.channel.send({
        embeds: [embed],
      });
    }
  },
});
