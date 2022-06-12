import { Command } from "../../structures/Command";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "8ball",
  usages: "$PREFIX$8ball <text>",
  cooldown: 1000 * 4,
  channel_type: "ALL",
  required: false,

  run: async ({ message, args }) => {
    const lang = await getLangRelative(message?.guildId, message.author.id);
    try {
      if (!args[0])
        return message.reply({
          content: langs[lang].common.missing_arguments,
        });

      const replies = langs[lang].modules.utility["8ball"];

      await message.reply({
        content: replies[Math.floor(Math.random() * replies.length)],
      });
    } catch {
      return;
    }
  },
});
