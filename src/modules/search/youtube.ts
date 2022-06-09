import { Command } from "../../structures/Command";
import ytsearch from "yt-search";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "youtube",
  aliases: ["yt", "search-youtube", "search-yt"],
  usages: "$PREFIX$youtube <search>",
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message, args }) => {
    const guildLang = await getLangGuild(message.guildId);
    const no_results = langs[guildLang].common.no_results;

    const query = args.join(" ");

    if (!query)
      return message.reply({
        content: langs[guildLang].common.missing_arguments,
      });

    const res = await ytsearch(query).catch(() => {
      message.reply({
        content: no_results,
      });
      return;
    });

    if (!res)
      return message.reply({
        content: no_results,
      });

    message.channel.send({
      content: res.videos[0].url,
    });
  },
});
