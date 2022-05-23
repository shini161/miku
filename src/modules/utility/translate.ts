import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import translate from "@iamtraction/google-translate";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "translate",
  usages: "$PREFIX$translate <text>",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = process.env.PREFIX;
      const color = Colors.celestialBlue;
      const query = args.join(" ");

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usages:",
            value: `${prefix}translate <text>`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      if (!query)
        return message.reply({
          embeds: [syntaxError],
        });

      const res = await translate(query, { to: "en" });
      const text =
        res.text.length >= 512
          ? res.text.slice(0, 512) + "..."
          : res.text.slice(0, 512);

      const embed = {
        title: "Translated Text",
        description: text,
        color: color as ColorResolvable,
      };

      return message.channel.send({
        embeds: [embed],
      });
    } catch (err) {
      console.log(err);
    }
  },
});
