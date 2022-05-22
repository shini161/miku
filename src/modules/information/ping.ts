import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  required: true,

  run: async ({ client, message, args }) => {
    message.reply({
      content: "pong!",
    });
  },
});
