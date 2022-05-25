import { Event } from "../structures/Event";
import {
  ColorResolvable,
  GuildTextBasedChannel,
  Permissions,
  WebhookClient,
} from "discord.js";
import { psql } from "../structures/Database";
import Colors from "../assets/colors.json";
import { client } from "..";

export default new Event("guildCreate", async (guild) => {
  try {
    let messageChannel: GuildTextBasedChannel;
    const color = Colors.celestialBlue;
    const prefix = process.env.PREFIX;
    const serverCount = client.guilds.cache.size;
    const totalMemberCount = client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );
    const webhookClient = new WebhookClient({
      id: process.env.GuildAddWebhookID,
      token: process.env.GuildAddWebhookToken,
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
    messageChannel.send({
      embeds: [embed],
    });

    // register guild to database
    await psql.query(
      `SELECT * FROM guilds WHERE id = '${guild.id}';`,
      async (err, res) => {
        if (err) throw err;
        if (!res.rowCount) {
          await psql.query(
            `INSERT INTO guilds (id) ` + `VALUES ('${guild.id}')`,
            async (err, res) => {
              if (err) throw err;
              console.log(res);
            }
          );
        }
      }
    );

    if (!webhookClient) return;
    await webhookClient.send({
      embeds: [guildData],
    });
  } catch (err) {
    console.log(err);
  }
});
