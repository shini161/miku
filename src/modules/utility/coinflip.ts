import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../assets/colors.json";

export default new Command({
  name: "coinflip",
  aliases: ["coin-flip", "flip"],
  usages: "$PREFIX$coinflip <tails/head>",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const prefix = process.env.PREFIX;

      const syntaxError = {
        title: "Syntax Error",
        fields: [
          {
            name: "Usage:",
            value: `${prefix}coinflip <tails/head>`,
          },
        ],
        color: Colors.syntaxError as ColorResolvable,
      };

      const headsWin = {
        title: "Its a heads!",
        description: "The coin landed on heads, you won the bet",
        color: "GREEN" as ColorResolvable,
      };
      const tailsWin = {
        title: "Its a tails!",
        description: "The coin landed on tails, you won the bet",
        color: "GREEN" as ColorResolvable,
      };
      const tailsLoose = {
        title: "Its a heads!",
        description: "The coin landed on heads, you lost the bet",
        color: "RED" as ColorResolvable,
      };
      const headsLoose = {
        title: "Its a tails",
        description: "The coin landed on tails, you lost the bet",
        color: "RED" as ColorResolvable,
      };

      let options = ["tails", "heads"];

      let coin = options[Math.floor(Math.random() * options.length)];
      if (!args[0])
        return message.channel.send({
          embeds: [syntaxError],
        });
      const bet = args[0].toLowerCase();
      if (bet !== "tails" && bet !== "heads")
        return message.channel.send({
          embeds: [syntaxError],
        });

      if (coin === bet) {
        if (bet === "tails")
          return message.channel.send({
            embeds: [tailsWin],
          });
        if (bet === "heads")
          return message.channel.send({
            embeds: [headsWin],
          });
      } else {
        if (bet === "tails")
          return message.channel.send({
            embeds: [tailsLoose],
          });
        if (bet === "heads")
          return message.channel.send({
            embeds: [headsLoose],
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
