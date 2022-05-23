import { Command } from "../../structures/Command";
import { Permissions, ColorResolvable, GuildMember } from "discord.js";
import Colors from "../../assets/colors.json";
import Emojis from "../../assets/emojis.json";

export default new Command({
  name: "serverinfo",
  aliases: ["server-info", "infoserver", "info-server"],
  usages: "$PREFIX$serverinfo",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const { greenTick } = Emojis;
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
        boostTiers: {
          NONE: "0",
          TIER_1: "1",
          TIER_2: "2",
          TIER_3: "3",
        },
        verificationLevels: {
          NONE: "None (unrestricted)",
          LOW: "Low (verified email on account)",
          MEDIUM: "Medium (registered on Discord for 5+ minutes)",
          HIGH: "High (member of the server for 10+ minutes)",
          VERY_HIGH: "Very High (verified phone number)",
        },
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
          text: message.guild.channels.cache.filter(
            (c) => c.type == "GUILD_TEXT"
          ).size,
          voice: message.guild.channels.cache.filter(
            (c) => c.type == "GUILD_VOICE"
          ).size,
          news: message.guild.channels.cache.filter(
            (c) => c.type == "GUILD_NEWS"
          ).size,
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
            name: "Verification Level",
            value: `${
              data.verificationLevels[message.guild.verificationLevel]
            }`,
          },
          {
            name: `Channels [${data.channels.total}]`,
            value:
              `${
                data.channels.category > 0
                  ? "Category: " + data.channels.category
                  : ""
              }` +
              `${
                data.channels.text > 0 ? "\nText: " + data.channels.text : ""
              }` +
              `${
                data.channels.voice > 0 ? "\nVoice: " + data.channels.voice : ""
              }` +
              `${
                data.channels.stage > 0 ? "\nStage: " + data.channels.stage : ""
              }` +
              `${
                data.channels.news > 0 ? "\nNews: " + data.channels.news : ""
              }` +
              `${
                data.channels.threads > 0
                  ? "\nThreads: " + data.channels.threads
                  : ""
              }`,
            inline: true,
          },
          {
            name: "Members",
            value:
              `Total: ${data.members.total}` +
              `\nUsers: ${data.members.humans}` +
              `\nBots: ${data.members.bots > 0 ? data.members.bots : "none"}`,
            inline: true,
          },
          {
            name: "Roles",
            value:
              data.roles.total > 0
                ? `${data.roles.total} roles`
                : "There are no roles.",
            inline: true,
          },
          {
            name: `Emojis${
              data.emojis.total > 0 ? " [" + data.emojis.total + "]" : ""
            }`,
            value:
              data.emojis.total > 0
                ? `Normal: ${
                    data.emojis.normal > 0 ? data.emojis.normal : "none"
                  }` +
                  `\nAnimated: ${
                    data.emojis.animated > 0 ? data.emojis.animated : "none"
                  }`
                : "There are no emojis",
            inline: true,
          },
          {
            name: "Boosts",
            value:
              `Level: ${data.boostTiers[message.guild.premiumTier]}` +
              `\nBoosts: ${
                message.guild.premiumSubscriptionCount > 0
                  ? message.guild.premiumSubscriptionCount
                  : "none"
              }`,
            inline: true,
          },
          {
            name: "Created On",
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
          name: "Features",
          value: `${data.features.join("\n")}`,
        });
      return message.channel.send({
        embeds: [embed],
      });
      function checkEmojis(data) {
        message.guild.emojis.cache.forEach((emoji) => {
          data.emojis.total++;
          if (emoji.animated) {
            data.emojis.animated++;
          } else {
            data.emojis.normal++;
          }
        });
      }
      function checkFeatures(data) {
        if (data.channels.storeCount > 0)
          data.features.push(`${greenTick}  Server Store`);
        if (message.guild.features.includes("ANIMATED_ICON"))
          data.features.push(`${greenTick}  Animated Icon`);
        if (message.guild.features.includes("BANNER"))
          data.features.push(`${greenTick}  Banner`);
        if (message.guild.features.includes("COMMERCE"))
          data.features.push(`${greenTick}  Commerce`);
        if (message.guild.features.includes("DISCOVERABLE"))
          data.features.push(`${greenTick}  Server Discovery`);
        if (message.guild.features.includes("FEATURABLE"))
          data.features.push(`${greenTick}  Featurable`);
        if (message.guild.features.includes("INVITE_SPLASH"))
          data.features.push(`${greenTick}  Invite Splash`);
        if (message.guild.features.includes("PARTNERED"))
          data.features.push(`${greenTick}  Partnered Server`);
        if (message.guild.features.includes("VANITY_URL"))
          data.features.push(`${greenTick}  Vanity Invite`);
        if (message.guild.features.includes("VERIFIED"))
          data.features.push(`${greenTick}  Verified Server`);
        if (message.guild.features.includes("VIP_REGIONS"))
          data.features.push(`${greenTick}  Vip Regions`);
        if (message.guild.features.includes("MONETIZATION_ENABLED"))
          data.features.push(`${greenTick}  Monetization`);
        if (message.guild.features.includes("ROLE_ICONS"))
          data.features.push(`${greenTick}  Role Icons`);
      }
    } catch (err) {
      console.log(err);
    }
  },
});
