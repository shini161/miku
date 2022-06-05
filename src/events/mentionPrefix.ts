import { Event } from "../structures/Event";
import { client } from "..";
import getPrefix from "../utils/getPrefix";
import { Permissions } from "discord.js";
import config from "../config.json";

export default new Event("messageCreate", async (message) => {
  const clientId = client.user.id;
  if (
      message.content !== `<@${clientId}>` &&
      message.content !== `<@!${clientId}>`
  )
    return;
  if (message.channel.type === "DM")
    return message.reply({
      content: `My prefix is **${config.prefix}**`,
    });

  if (
      !message.guild.me
          .permissionsIn(message.channel)
          .has(Permissions.FLAGS.SEND_MESSAGES) &&
      !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  )
    return;
  const prefix = await getPrefix(message.guildId);
  return message.reply({
    content: `My prefix in this guild is **${prefix}**`,
  });
});
