import { Event } from "../structures/Event";
import { client } from "..";
import getPrefix from "../utils/getPrefix";
import { GuildChannelResolvable, Permissions } from "discord.js";
import config from "../assets/config.json";

export default new Event("messageCreate", (message) => {
  const clientId = client.user.id;
  if (
    message.content !== `<@${clientId}>` &&
    message.content !== `<@!${clientId}>`
  )
    return;
  if (message.channel.type === "DM") return returnPrefix("USER");
  if (
    !message.guild.me
      .permissionsIn(message.channel)
      .has(Permissions.FLAGS.SEND_MESSAGES) &&
    !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  )
    return;
  returnPrefix("GUILD");

  async function returnPrefix(type: "USER" | "GUILD") {
    if (type === "USER")
      return message.reply({
        content: `My prefix is **${config.prefix}**`,
      });
    const prefix = await getPrefix(message.guild.id);
    return message.reply({
      content: `My prefix in this guild is **${prefix}**`,
    });
  }
});
