import { Command } from "../../structures/Command";
import getLangUser from "../../utils/getLang-user";
import langs from "../../../assets/langs/langs";
import wikiData from "../../../assets/wiki.json";

export default new Command({
  name: "wiki",
  usages: "$PREFIX$wiki [query]",
  channel_type: "ALL",
  required: false,

  run: async ({ message, args }) => {
    try {
      const lang = await getLangUser(message.author.id);
      let query = args.join(" ").toLowerCase();
      let url = wikiData[query];

      if (!query || !url) {
        query = "home";
        url = wikiData[query];
      }

      await message.reply({
        content: langs[lang].modules.information.wiki[query](url),
      });
    } catch {
      return;
    }
  },
});
