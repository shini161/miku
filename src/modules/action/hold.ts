import { Command } from "../../structures/Command";
import ActionData from "../../../assets/action-module.json";
import Colors from "../../../assets/colors.json";
import { ColorResolvable } from "discord.js";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

const name = "hold"; // command name
export default new Command({
  name,
  usages: `$PREFIX$${name} <@user>`,
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message }) => {
    let text: string[];
    let images = ActionData[name].images;
    const color = Colors.celestialBlue;
    const target = message.mentions.members.first();
    const guildLang = await getLangGuild(message.guildId);

    switch (target?.id) {
      case undefined:
        await message.reply({
          content: langs[guildLang].common.please_mention_user,
        });
        break;
      case message.author.id:
        text = langs?.[guildLang].modules.action[name].target.self(
          message.author.username
        );
        await sendEmbed(text, images);
        break;
      default:
        text = langs?.[guildLang].modules.action[name].target.default(
          message.author.username,
          target.user.username
        );
        await sendEmbed(text, images);
    }

    async function sendEmbed(text: string[], images: string[]) {
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
