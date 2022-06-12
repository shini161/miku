import { Command } from "../../structures/Command";
import { ColorResolvable } from "discord.js";
import Colors from "../../../assets/colors.json";
import Emojis from "../../../assets/emojis.json";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "serverinfo",
  aliases: ["server-info"],
  usages: "$PREFIX$serverinfo",
  cooldown: 1000 * 4,
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ client, message }) => {
    const { greenTick } = Emojis;
    const lang = await getLangGuild(message.guildId);
    const guildFeatures = langs[lang].modules.utility.serverInfo.features;
    const color = Colors.celestialBlue;
    let data = {
      name: message.guild.name,
      id: message.guild.id,
      icon: message.guild.iconURL({ dynamic: true }),
      owner: await client.users
        .fetch(message.guild.ownerId)
        .then(async (user) => {
          return user;
        }),
      boostTiers: langs[lang].modules.utility.serverInfo.boostTiers,
      verificationLevels:
        langs[lang].modules.utility.serverInfo.verificationLevels,

      members: {
        total: message.guild.memberCount,
        bots: message.guild.members.cache.filter((member) => member.user.bot)
          .size,
        humans: 0,
      },
      channels: {
        total: message.guild.channels.cache.size,
        category: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_CATEGORY"
        ).size,
        text: message.guild.channels.cache.filter((c) => c.type == "GUILD_TEXT")
          .size,
        voice: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_VOICE"
        ).size,
        news: message.guild.channels.cache.filter((c) => c.type == "GUILD_NEWS")
          .size,
        store: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_STORE"
        ).size,
        stage: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_STAGE_VOICE"
        ).size,
        newsThreads: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_NEWS_THREAD"
        ).size,
        publicThreads: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_PUBLIC_THREAD"
        ).size,
        privateThreads: message.guild.channels.cache.filter(
          (c) => c.type == "GUILD_PRIVATE_THREAD"
        ).size,
        threads: 0,
      },
      roles: {
        total: message.guild.roles.cache.size,
      },
      emojis: {
        total: 0,
        normal: 0,
        animated: 0,
      },
      features: [],
    };

    data.members.humans = data.members.total - data.members.bots;
    data.channels.threads =
      data.channels.newsThreads +
      data.channels.publicThreads +
      data.channels.privateThreads;
    checkFeatures(data);
    checkEmojis(data);

    let embed = {
      author: {
        name: data.name,
        icon_url: data.icon,
      },
      title: `ID: ${data.id}`,
      fields: [
        {
          name: "Owner",
          value: `${data.owner.tag} [${data.owner.id}]`,
        },
        {
          name: langs[lang].modules.utility.serverInfo.verification_level,
          value: `${data.verificationLevels[message.guild.verificationLevel]}`,
        },
        {
          name: `${langs[lang].common.channels} [${data.channels.total}]`,
          value:
            `${
              data.channels.category > 0
                ? `${langs[lang].common.category}: ${data.channels.category}`
                : ""
            }` +
            `${
              data.channels.text > 0
                ? `\n${langs[lang].common.channelTypes.text}: ${data.channels.text}`
                : ""
            }` +
            `${
              data.channels.voice > 0
                ? `\n${langs[lang].common.channelTypes.voice}: ${data.channels.voice}`
                : ""
            }` +
            `${
              data.channels.stage > 0
                ? `\n${langs[lang].common.channelTypes.stage}: ${data.channels.stage}`
                : ""
            }` +
            `${
              data.channels.news > 0
                ? `\n${langs[lang].common.channelTypes.news}: ${data.channels.news}`
                : ""
            }` +
            `${
              data.channels.threads > 0
                ? `\n${langs[lang].common.channelTypes.threads}: ${data.channels.threads}`
                : ""
            }`,
          inline: true,
        },
        {
          name: langs[lang].common.members,
          value:
            `${langs[lang].common.total}: ${data.members.total}` +
            `\n${langs[lang].common.users}: ${data.members.humans}` +
            `\n${langs[lang].common.bots}: ${
              data.members.bots > 0
                ? data.members.bots
                : langs[lang].common.none.toLowerCase()
            }`,
          inline: true,
        },
        {
          name: langs[lang].common.roles,
          value:
            data.roles.total > 0
              ? `${data.roles.total} ${langs[lang].common.roles.toLowerCase()}`
              : langs[lang].modules.utility.serverInfo.no_roles,
          inline: true,
        },
        {
          name: `${langs[lang].common.emojis}${
            data.emojis.total > 0 ? " [" + data.emojis.total + "]" : ""
          }`,
          value:
            data.emojis.total > 0
              ? `${langs[lang].common.normal}: ${
                  data.emojis.normal > 0
                    ? data.emojis.normal
                    : langs[lang].common.none.toLowerCase()
                }` +
                `\n${langs[lang].common.animated}: ${
                  data.emojis.animated > 0
                    ? data.emojis.animated
                    : langs[lang].common.none.toLowerCase()
                }`
              : langs[lang].modules.utility.serverInfo.no_emojis,
          inline: true,
        },
        {
          name: langs[lang].common.boosts,
          value:
            `${langs[lang].common.level}: ${
              data.boostTiers[message.guild.premiumTier]
            }` +
            `\n${langs[lang].common.boosts}: ${
              message.guild.premiumSubscriptionCount > 0
                ? message.guild.premiumSubscriptionCount
                : langs[lang].common.none.toLowerCase()
            }`,
          inline: true,
        },
        {
          name: langs[lang].common.created_on,
          value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>`,
          inline: true,
        },
      ],
      thumbnail: {
        url: data.icon,
      },
      color: color as ColorResolvable,
    };

    if (data.features.length > 0)
      embed.fields.push({
        name: langs[lang].common.features,
        value: `${data.features.join("\n")}`,
      });
    return message.channel.send({
      embeds: [embed],
    });
    function checkEmojis(data) {
      message.guild.emojis.cache.map((emoji) => {
        switch (emoji.animated) {
          case true:
            data.emojis.animated++;
            break;
          default:
            data.emojis.normal++;
        }
      });
    }
    function checkFeatures(data) {
      if (data.channels.storeCount > 0)
        data.features.push(`${greenTick}  ${guildFeatures.server_store}`);
      if (message.guild.features.includes("ANIMATED_ICON"))
        data.features.push(`${greenTick}  ${guildFeatures.animated_icon}`);
      if (message.guild.features.includes("BANNER"))
        data.features.push(`${greenTick}  ${guildFeatures.banner}`);
      if (message.guild.features.includes("COMMERCE"))
        data.features.push(`${greenTick}  ${guildFeatures.commerce}`);
      if (message.guild.features.includes("DISCOVERABLE"))
        data.features.push(`${greenTick}  ${guildFeatures.discoverable}`);
      if (message.guild.features.includes("FEATURABLE"))
        data.features.push(`${greenTick}  ${guildFeatures.featurable}`);
      if (message.guild.features.includes("INVITE_SPLASH"))
        data.features.push(`${greenTick}  ${guildFeatures.invite_splash}`);
      if (message.guild.features.includes("PARTNERED"))
        data.features.push(`${greenTick}  ${guildFeatures.partnered_server}`);
      if (message.guild.features.includes("VANITY_URL"))
        data.features.push(`${greenTick}  ${guildFeatures.vanity_url}`);
      if (message.guild.features.includes("VERIFIED"))
        data.features.push(`${greenTick}  ${guildFeatures.verified_server}`);
      if (message.guild.features.includes("VIP_REGIONS"))
        data.features.push(`${greenTick}  ${guildFeatures.vip_regions}`);
      if (message.guild.features.includes("MONETIZATION_ENABLED"))
        data.features.push(
          `${greenTick}  ${guildFeatures.monetization_enabled}`
        );
      if (message.guild.features.includes("ROLE_ICONS"))
        data.features.push(`${greenTick}  ${guildFeatures.role_icons}`);
    }
  },
});
