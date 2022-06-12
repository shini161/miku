import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "coinflip",
  aliases: ["coin-flip", "flip"],
  usages: "$PREFIX$coinflip <tails/head>",
  cooldown: 1000 * 4,
  channel_type: "ALL",
  required: false,

  run: async ({ message, args }) => {
    const lang = await getLangRelative(message?.guildId, message.author.id);
    const embedData = langs[lang].modules.utility.coinflip.embeds;
    const tailsWin = {
      title: embedData.tails.title,
      description: embedData.tails.won_desc,
      color: "GREEN" as ColorResolvable,
    };
    const tailsLoose = {
      title: embedData.heads.title,
      description: embedData.tails.lost_desc,
      color: "RED" as ColorResolvable,
    };
    const headsWin = {
      title: embedData.heads.title,
      description: embedData.heads.won_desc,
      color: "GREEN" as ColorResolvable,
    };
    const headsLoose = {
      title: embedData.tails.title,
      description: embedData.heads.lost_desc,
      color: "RED" as ColorResolvable,
    };
    let options = ["tails", "heads"];
    let coin = options[Math.floor(Math.random() * options.length)];

    if (!args[0])
      return message.channel.send({
        content: langs[lang].common.missing_arguments,
      });
    const bet = args[0].toLowerCase();
    if (!options.includes(bet))
      return message.channel.send({
        content: langs[lang].common.invalid_arguments,
      });

    if (coin === bet) {
      if (bet === "tails")
        return message.reply({
          embeds: [tailsWin],
        });
      if (bet === "heads")
        return message.reply({
          embeds: [headsWin],
        });
    }
    if (bet === "tails")
      return message.reply({
        embeds: [tailsLoose],
      });
    if (bet === "heads")
      return message.reply({
        embeds: [headsLoose],
      });
  },
});
