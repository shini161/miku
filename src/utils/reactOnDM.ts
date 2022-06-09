import { GuildChannelResolvable, Message, Permissions } from "discord.js";
import Emojis from "../../assets/emojis.json";

export default async function (message: Message<boolean>, messageOptions: {}) {
  const { greenTick, greenTickCustom, redTick, redTickCustom } = Emojis;
  let trigger = true;
  if (
    message.guild.me
      .permissionsIn(message.channel as GuildChannelResolvable)
      .has(Permissions.FLAGS.SEND_MESSAGES) ||
    message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
  )
    return message.reply(messageOptions);

  message.author.send(messageOptions).catch(() => {
    trigger = false;
  });

  if (
    message.guild.me
      .permissionsIn(message.channel as GuildChannelResolvable)
      .has(Permissions.FLAGS.ADD_REACTIONS)
  ) {
    if (
      message.guild.me
        .permissionsIn(message.channel as GuildChannelResolvable)
        .has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)
    ) {
      if (trigger) return await message.react(greenTickCustom);
      await message.react(redTickCustom);
      return;
    }
    if (trigger) return await message.react(greenTick);
    await message.react(redTick);
  }
}
