import { Event } from "../structures/Event";
import { client } from "..";
import { GuildChannelResolvable, Permissions } from "discord.js";
import config from "../assets/config.json";

export default new Event("messageCreate", async (message) => {
  if (message.author.bot) return;
  const prefix = config.prefix;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (!command) return;
  switch (command.channel_type) {
    case "DM_ONLY":
      if (message.channel.type !== "DM") return;
      await command.run({ client, message, args });
      break;
    case "GUILD_ONLY":
      if (message.channel.type === "DM")
        return message.reply({
          content: "You can't run this command here!",
        });
      checkRequired();
      break;
    default:
      if (message.channel.type === "DM")
        return await command.run({ client, message, args });
      checkRequired();
  }
  async function checkRequired() {
    if (command.required) {
      if (
        !message.guild.me
          .permissionsIn(message.channel as GuildChannelResolvable)
          .has(Permissions.FLAGS.SEND_MESSAGES) &&
        !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return;
      return await command.run({ client, message, args });
    }
    try {
      await command.run({ client, message, args });
    } catch (err) {
      console.log(err);
    }
  }
});
