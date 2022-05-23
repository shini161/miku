import { Command } from "../../structures/Command";
import Colors from "../../assets/colors.json";
import ytsearch from "yt-search";
import { ColorResolvable } from "discord.js";

export default new Command({
  name: "youtube",
  aliases: ["yt", "search-youtube", "search-yt"],
  usages: "$PREFIX$youtube <search>",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = process.env.globalPrefix;

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}youtube <search>`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      const query = args.join(" ");

      if (!query)
        return message.reply({
          embeds: [syntaxError],
        });

      const res = await ytsearch(query).catch(() => {
        return message.reply({
          content: "No results were found!",
        });
      });

      if (!res)
        return message.reply({
          content: "No results were found!",
        });

      message.channel.send({
        content: res.videos[0].url,
      });
    } catch (err) {
      console.log(err);
    }
  },
});
