import { Event } from "../structures/Event";
import { client } from "..";
import { GuildChannelResolvable, Permissions } from "discord.js";
import config from "../config.json";
import { glob } from "glob";
import { promisify } from "util";
import getPrefix from "../utils/getPrefix";

const globPromise = promisify(glob);

export default new Event("messageCreate", async (message) => {
  if (message.author.bot) return;
  const prefix = await getPrefix(message.guildId);
  const clientId = client.user.id;

  // const prefixes = [prefix, `${client.user} `, `${message.guild.me} `];
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (!command) return;
  // await checkCooldown(message.author.id, message.channel.id);
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
      await checkRequired();
      break;
    default:
      if (message.channel.type === "DM")
        return await command.run({ client, message, args });
      await checkRequired();
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
      await command.run({ client, message, args });
      return;
    }
    try {
      await command.run({ client, message, args });
    } catch (err) {
      console.log(err);
    }
  }
  function checkCooldown(userId: string, channelId: string) {
    const commandPath = globPromise(
      `${__dirname}/../modules/*/${command.name}{.ts,.js}`
    );
    const commandFolderName = commandPath[0].substring(
      0,
      commandPath[0].lastIndexOf("\\") + 1
    );
    const cooldown =
      (command.cooldown === "Module"
        ? config.modules[commandFolderName].cooldown
        : command.cooldown) || 0;
  }
});
