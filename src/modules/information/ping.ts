import { Command } from "../../structures/Command";
import getLangUser from "../../utils/getLang-user";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "ping",
  usages: "$PREFIX$ping",
  channel_type: "ALL",
  required: true,

  run: async ({ client, message }) => {
    const lang = await getLangUser(message.author.id);
    let msg = await message.reply({
      content: "🏓  **|**  Pong!",
    });

    const botLatency = Math.floor(
      msg.createdAt.getTime() - message.createdAt.getTime()
    );
    const wsLatency = client.ws.ping;

    msg
      .edit({
        content: `🏓  **|**  Pong! - **${langs[lang].common.time_taken}: ${botLatency}ms** (WebSocket: ${wsLatency}ms)`,
      })
      .catch(() => {
        return;
      });
  },
});
