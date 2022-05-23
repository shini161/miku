import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  required: true,

  run: async ({ client, message, args }) => {
    let msg = await message.reply({
      content: "🏓  **|**  Pong!",
    });

    const botLatency = Math.floor(
      msg.createdAt.getTime() - message.createdAt.getTime()
    );
    const apiLatency = client.ws.ping;

    msg
      .edit({
        content: `🏓  **|**  Pong! - Time: \`${botLatency}ms\``,
      })
      .catch(() => {
        return;
      });
  },
});
