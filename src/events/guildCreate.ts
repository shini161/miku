import { Event } from "../structures/Event";
import {
  ColorResolvable,
  Permissions,
  TextChannel,
  WebhookClient,
} from "discord.js";
import Colors from "../../assets/colors.json";
import { client } from "..";
import addGuild from "../utils/addGuild";
import sql from "../structures/Database";
import getPrefix from "../utils/getPrefix";

export default new Event("guildCreate", async (guild) => {
  try {
    let messageChannel: TextChannel;
    const color = Colors.celestialBlue;
    const prefix = await getPrefix(guild.id);
    const serverCount = client.guilds.cache.size;
    const totalMemberCount = client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );
    const webhookClient = new WebhookClient({
      id: process.env.GUILDADD_WEBHOOKID,
      token: process.env.GUILDADD_WEBHOOKTOKEN,
    });

    guild.channels.cache.forEach((channel) => {
      if (channel.type === "GUILD_TEXT" && !messageChannel) {
        if (
          (channel
            .permissionsFor(guild.me)
            .has(Permissions.FLAGS.VIEW_CHANNEL) &&
            channel
              .permissionsFor(guild.me)
              .has(Permissions.FLAGS.SEND_MESSAGES)) ||
          guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
        )
          messageChannel = channel;
      }
    });

    const guildOwner = await guild.fetchOwner();

    const embed = {
      title: "Bot Joined!",
      description: `My prefix in **${guild.name}** is \`${prefix}\``,
      color: color as ColorResolvable,
    };
    const guildData = {
      author: {
        name: `${guild.me.user.tag} joined new guild!`,
        icon_url: guild.me.user.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: "Guild Name:",
          value: `${guild.name}`,
        },
        {
          name: "Guild ID:",
          value: `${guild.id}`,
        },
        {
          name: "Member Count",
          value: `${guild.memberCount}`,
        },
        {
          name: `Guild Owner:`,
          value: `${guildOwner}`,
        },
        {
          name: "Owner ID:",
          value: `${guild.ownerId}`,
        },
      ],
      footer: {
        text: `Servers: ${serverCount} - Members: ${totalMemberCount}`,
      },
      thumbnail: {
        url: guild.iconURL({ dynamic: true }),
      },
      timestamp: new Date(),
      color: Colors.celestialBlue as ColorResolvable,
    };
    await messageChannel.send({
      embeds: [embed],
    });

    // register guild to database
    const res = await sql`SELECT * FROM guilds WHERE id = ${guild.id}`;
    if (!res.length) await addGuild(guild.id);

    if (!webhookClient) return;
    await webhookClient.send({
      embeds: [guildData],
    });
  } catch (err) {
    console.log(err);
  }
});
