import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  usages: "$PREFIX$ping",
  channel_type: "ALL",
  required: true,

  run: async ({ client, message}) => {
    let msg = await message.reply({
      content: "🏓  **|**  Pong!",
    });

    const botLatency = Math.floor(
      msg.createdAt.getTime() - message.createdAt.getTime()
    );
    const wsLatency = client.ws.ping;

    msg
      .edit({
        content: `🏓  **|**  Pong! - **Time taken: ${botLatency}ms** (WebSocket: ${wsLatency}ms)`,
      })
      .catch(() => {
        return;
      });
  },
});
