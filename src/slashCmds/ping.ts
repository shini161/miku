import { SlashCommand } from "../structures/SlashCommand";

export default new SlashCommand({
  name: "ping",
  description: "returns bot latency",
  run: async ({ interaction, client, args }) => {
    let msg = await interaction.followUp({
      content: "🏓  **|**  Pong!",
    });
    const apiLatency = client.ws.ping;
  },
});
