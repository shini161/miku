import { SlashCommand } from "../../structures/SlashCmds";

export default new SlashCommand({
  name: "ping",
  description: "returns bot latency.",
  run: async ({ interaction, client }) => {
    interaction.followUp("Pong3");
  },
});
