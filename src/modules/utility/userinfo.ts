import { Command } from "../../structures/Command";
import { Permissions, GuildMember } from "discord.js";
import Emojis from "../../../assets/emojis.json";
import { getUserId } from "../../utils/getStringID";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";

export default new Command({
  name: "userinfo",
  aliases: ["whois", "user-info"],
  usages: "$PREFIX$userinfo [@user]",
  cooldown: 1000 * 4,
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message, args }) => {
    const {
      desktop_pc,
      discordEmployeeBadge,
      partneredBadge,
      certifiedModeratorBadge,
      hypesquadManagerBadge,
      houseBraveryBadge,
      houseBrillianceBadge,
      houseBalanceBadge,
      bughunter1Badge,
      bughunter2Badge,
      earlyVerifiedBotDeveloperBadge,
      earlySupporterBadge,
      verifiedBotBadge,
      mobile,
      mobileOnlineStatus,
      invisibleStatus,
      onlineStatus,
      idleStatus,
      dndStatus,
    } = Emojis;
    const lang = await getLangGuild(message.guildId);
    const userInfoData = langs[lang].modules.utility.userinfo;
    let id = getUserId(args?.[0], message.author.id);
    const USER = message.guild.members.cache.get(id);
    if (USER) return getInfo(USER);
    return getInfo(message.member);

    async function getInfo(user: GuildMember) {
      try {
        let data = {
          id: user.id,
          nickname: user.nickname ? user.nickname : user.user.username,
          roles: user.roles.cache.map((r) => r),
          badges: [],
          permissions: [],
          avatar: user.displayAvatarURL({ dynamic: true }),
          color: {
            hex: user.displayHexColor,
            display: user.displayColor,
          },
          joined: `<t:${Math.floor(user.joinedTimestamp / 1000)}:D>`,
          created: `<t:${Math.floor(user.user.createdTimestamp / 1000)}:D>`,
          device: userInfoData.unavailable,
          status: userInfoData.unavailable,
        };
        getDeviceAndStatus(user, data);
        let embed = {
          author: {
            name: `${user.user.tag}`,
            icon_url: data.avatar,
          },
          description: `[Avatar](${data.avatar})\nID: ${data.id}`,
          fields: [
            {
              name: `${userInfoData.server_nickname}:`,
              value: data.nickname,
              inline: true,
            },
            {
              name: `${langs[lang].common.color}:`,
              value: `${data.color.hex}`,
              inline: true,
            },
            {
              name: `${userInfoData.platform}:`,
              value: `${data.device}`,
              inline: true,
            },
            {
              name: `${userInfoData.status}:`,
              value: data.status,
              inline: true,
            },
            {
              name: `${langs[lang].common.joined_at}:`,
              value: data.joined,
              inline: true,
            },
            {
              name: `${langs[lang].common.created_at}:`,
              value: data.created,
              inline: true,
            },
          ],
          thumbnail: {
            url: data.avatar,
          },
          color: data.color.display,
        };
        getBadges(user, data, embed);
        getPermissions(user, data, embed);
        if (data.roles.length > 1)
          embed.fields.push({
            name: `${langs[lang].common.roles} [ ${data.roles.length - 1} ]`,
            value:
              data.roles.length > 33
                ? data.roles.slice(0, 32).join(", ") + "** . . .**"
                : data.roles.slice(0, data.roles.length - 1).join(", "),
            inline: false,
          });

        return message.channel.send({
          embeds: [embed],
        });
      } catch (err) {
        console.log(err);
        return message.reply({
          content: langs[lang].common.errorOccurred,
        });
      }
    }
    function getBadges(user, data, embed) {
      if (user.user.flags) {
        const badge = user.user.flags.serialize();
        if (badge.DISCORD_EMPLOYEE) data.badges.push(discordEmployeeBadge);
        if (badge.PARTNERED_SERVER_OWNER) data.badges.push(partneredBadge);
        if (badge.DISCORD_CERTIFIED_MODERATOR)
          data.badges.push(certifiedModeratorBadge);
        if (badge.HYPESQUAD_EVENTS) data.badges.push(hypesquadManagerBadge);
        if (badge.HOUSE_BRAVERY) data.badges.push(houseBraveryBadge);
        if (badge.HOUSE_BRILLIANCE) data.badges.push(houseBrillianceBadge);
        if (badge.HOUSE_BALANCE) data.badges.push(houseBalanceBadge);
        if (badge.BUGHUNTER_LEVEL_1) data.badges.push(bughunter1Badge);
        if (badge.BUGHUNTER_LEVEL_2) data.badges.push(bughunter2Badge);
        if (badge.EARLY_VERIFIED_BOT_DEVELOPER)
          data.badges.push(earlyVerifiedBotDeveloperBadge);
        if (badge.EARLY_SUPPORTER) data.badges.push(earlySupporterBadge);
        if (badge.VERIFIED_BOT) data.badges.push(verifiedBotBadge);
      }
      if (data.badges.length > 0)
        embed.fields.push({
          name: `${langs[lang].common.badges} [ ${data.badges.length} ]`,
          value: data.badges.join("  "),
        });
    }
    function getPermissions(user, data, embed) {
      if (user.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        data.permissions.push(userInfoData.permissions.administrator);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
        data.permissions.push(userInfoData.permissions.manage_guild);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
        data.permissions.push(userInfoData.permissions.manage_roles);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
        data.permissions.push(userInfoData.permissions.manage_channels);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
        data.permissions.push(userInfoData.permissions.manage_messages);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_WEBHOOKS))
        data.permissions.push(userInfoData.permissions.manage_webhooks);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES))
        data.permissions.push(userInfoData.permissions.manage_nicknames);
      if (user.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS))
        data.permissions.push(
          userInfoData.permissions.manage_emojis_and_stickers
        );
      if (user.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
        data.permissions.push(userInfoData.permissions.kick_members);
      if (user.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        data.permissions.push(userInfoData.permissions.ban_members);
      if (user.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
        data.permissions.push(userInfoData.permissions.moderate_members);
      if (user.permissions.has(Permissions.FLAGS.MENTION_EVERYONE))
        data.permissions.push(userInfoData.permissions.mention_everyone);

      if (data.permissions.length > 0)
        embed.fields.push({
          name: `${userInfoData.key_permissions} [ ${data.permissions.length} ]`,
          value: data.permissions.join(", "),
        });
    }
    function getDeviceAndStatus(user, data) {
      let device = user.presence?.clientStatus;
      if (!user.presence || !device) {
        data.device = userInfoData.unavailable;
      } else if (device.desktop || device.web) {
        data.device = `${desktop_pc}  PC`;
      } else if (device.mobile) {
        data.device = `${mobile}  Mobile`;
      } else {
        data.device = userInfoData.unavailable;
      }

      let status = user.presence?.status;
      if (!user.presence || !status)
        data.status = `${invisibleStatus}  ${userInfoData.invisible}`;
      if (
        status === "online" &&
        data.device === `${mobileOnlineStatus}  Mobile`
      )
        data.status = `${mobileOnlineStatus}  Online`;
      if (status === "online" && data.device === `${desktop_pc}  PC`)
        data.status = `${onlineStatus}  Online`;
      if (status === "idle")
        data.status = `${idleStatus}  ${userInfoData.idle}`;
      if (status === "dnd")
        data.status = `${dndStatus}  ${userInfoData.do_not_disturb}`;
    }
  },
});
