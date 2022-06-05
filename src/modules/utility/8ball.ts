import { Command } from "../../structures/Command";
import replies from "../../../assets/8ball.json";

export default new Command({
  name: "8ball",
  usages: "$PREFIX$8ball <text>",
  channel_type: "ALL",

  run: async ({ client, message, args }) => {
    if (!args[0])
      return message.reply({
        content: "❌ Missing arguments!",
      });

    const reply = replies[Math.floor(Math.random() * replies.length)];

    await message.reply({
      content: reply,
    });
  },
});
