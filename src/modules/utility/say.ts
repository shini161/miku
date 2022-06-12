import { Command } from "../../structures/Command";
import getLangRelative from "../../utils/getLang-relative";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "say",
  usages: "$PREFIX$say <text>",
  cooldown: 1000 * 4,
  channel_type: "ALL",
  required: false,

  run: async ({ message, args }) => {
    const lang = await getLangRelative(message?.guildId, message.author.id);

    const authorButton = {
      type: 1,
      components: [
        {
          type: 2,
          label: `${message.author.tag}`,
          style: 2,
          disabled: true,
          custom_id: "SAY_CMD_MESSAGE_AUTHOR",
        },
      ],
    };

    const query = args.join(" ");
    if (!query)
      return message.reply({
        content: langs[lang].common.missing_arguments,
      });
    const content = query.length >= 512 ? query.slice(0, 512) + "..." : query;

    message.channel.send({
      content,
      allowedMentions: { parse: [] },
      components: [authorButton],
    });

    await message.delete().catch(() => {
      return;
    });
  },
});
