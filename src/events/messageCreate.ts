import { Event } from "../structures/Event";
import { client } from "..";
import { GuildChannelResolvable, Permissions } from "discord.js";

export default new Event("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  const prefix = process.env.globalPrefix;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (!command) return;
  if (command.required) {
    if (
      message.guild.me
        .permissionsIn(message.channel as GuildChannelResolvable)
        .has(Permissions.FLAGS.SEND_MESSAGES) ||
      message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
    ) {
      await command.run({ client, message, args });
    }
  } else {
    try {
      await command.run({ client, message, args });
    } catch (err) {
      console.log(err);
    }
  }
});
