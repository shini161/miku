import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/SlashCommand";
import config from "../config.json";

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply();

    const command = client.slashCmds.get(interaction.commandName);
    const devCommand = client.devSlashCmds.get(interaction.commandName);

    if (!command && !devCommand)
      return interaction.followUp("That command doesn't exist!");

    if (command) {
      switch (command.channel_type) {
        case "DM_ONLY":
          if (interaction.guild)
            return interaction.followUp({
              content: "This command cannot be runned in guilds!",
            });
        case "GUILD_ONLY":
          if (!interaction.guild)
            return interaction.followUp({
              content: "This command can be runned in guilds only!",
            });
        default:
          command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
          });
      }
      return;
    }

    if (devCommand.ownerOnly) {
      if (interaction.user.id !== config.ownerId) return;
    }
    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }
});
