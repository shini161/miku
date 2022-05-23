import { Command } from "../../structures/Command";
import { Permissions, ColorResolvable, GuildMember } from "discord.js";
import Colors from "../../assets/colors.json";
import Emojis from "../../assets/emojis.json";

export default new Command({
  name: "userinfo",
  aliases: ["infouser", "whois", "ui", "user-info", "info-user"],
  usages: "$PREFIX$userinfo [@user]",
  required: true,

  run: async ({ client, message, args }) => {
    try {
      const { desktop_pc } = Emojis;
      let id = message.author.id;

      if (args[0]) {
        if (
          args[0].startsWith("<@") &&
          args[0].endsWith(">") &&
          args[0].length == 21 &&
          !isNaN(+args[0].slice(2, 20))
        )
          id = args[0].slice(2, 20);
        if (
          args[0].startsWith("<@!") &&
          args[0].endsWith(">") &&
          args[0].length == 22 &&
          !isNaN(+args[0].slice(3, 21))
        )
          id = args[0].slice(3, 21);
        if (!isNaN(+args[0]) && args[0].length === 18) id = args[0];
      }
      const USER = message.guild.members.cache.get(id);
      if (USER) return getInfo(USER);
      getInfo(message.member);

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
            device: "Unavailable",
            status: "Unavailable",
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
                name: "Server Nickname:",
                value: data.nickname,
                inline: true,
              },
              {
                name: "Color:",
                value: `${data.color.hex}`,
                inline: true,
              },
              {
                name: "Platform:",
                value: `${data.device}`,
                inline: true,
              },
              {
                name: "Status:",
                value: data.status,
                inline: true,
              },
              {
                name: "Joined at:",
                value: data.joined,
                inline: true,
              },
              {
                name: "Created at:",
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
              name: `Roles [ ${data.roles.length - 1} ]`,
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
            content: "Something went wrong! Try again later",
          });
        }
      }
      function getBadges(user, data, embed) {
        if (user.user.flags) {
          const badge = user.user.flags.serialize();
          if (badge.DISCORD_EMPLOYEE)
            data.badges.push("<:discord_employee:938515131212636212>");
          if (badge.PARTNERED_SERVER_OWNER)
            data.badges.push("<:partnered_badge:938515187810570260>");
          if (badge.DISCORD_CERTIFIED_MODERATOR)
            data.badges.push("<:certified_moderator:938515206840131644>");
          if (badge.HYPESQUAD_EVENTS)
            data.badges.push("<:hypersquad_manager:938515236619706420>");
          if (badge.HOUSE_BRAVERY)
            data.badges.push("<:bravery:938515263459061800>");
          if (badge.HOUSE_BRILLIANCE)
            data.badges.push("<:brilliance:938515280374693898>");
          if (badge.HOUSE_BALANCE)
            data.badges.push("<:balance:938515336356044831>");
          if (badge.BUGHUNTER_LEVEL_1)
            data.badges.push("<:bughunter_level1:938515421273944106>");
          if (badge.BUGHUNTER_LEVEL_2)
            data.badges.push("<:bughunter_level2:938515421454303263>");
          if (badge.EARLY_VERIFIED_BOT_DEVELOPER)
            data.badges.push(
              "<:early_verified_bot_developer:938515505373904927>"
            );
          if (badge.EARLY_SUPPORTER)
            data.badges.push("<:early_supporter:938515506242146304>");
          if (badge.VERIFIED_BOT)
            data.badges.push("<:verified_bot:938515540601888788>");
        }
        if (data.badges.length > 0)
          embed.fields.push({
            name: `Badges [ ${data.badges.length} ]`,
            value: data.badges.join("  "),
          });
      }
      function getPermissions(user, data, embed) {
        if (user.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
          data.permissions.push("Administrator");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
          data.permissions.push("Manage Server");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
          data.permissions.push("Manage Roles");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
          data.permissions.push("Manage Channels");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
          data.permissions.push("Manage Messages");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_WEBHOOKS))
          data.permissions.push("Manage Webhooks");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES))
          data.permissions.push("Manage Nicknames");
        if (user.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS))
          data.permissions.push("Manage Emojis & Stickers");
        if (user.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
          data.permissions.push("Kick Members");
        if (user.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
          data.permissions.push("Ban Members");
        if (user.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
          data.permissions.push("Moderate Members");
        if (user.permissions.has(Permissions.FLAGS.MENTION_EVERYONE))
          data.permissions.push("Mention Everyone");

        if (data.permissions.length > 0)
          embed.fields.push({
            name: `Key Permissions [ ${data.permissions.length} ]`,
            value: data.permissions.join(", "),
          });
      }
      function getDeviceAndStatus(user, data) {
        let device = user.presence?.clientStatus;
        if (!user.presence || !device) {
          data.device = "Unavailable";
        } else if (device.desktop || device.web) {
          data.device = `${desktop_pc}  PC`;
        } else if (device.mobile) {
          data.device = "<:mobile:938514572971753502>  Mobile";
        } else {
          data.device = "Unavailable";
        }

        let status = user.presence?.status;
        if (!user.presence || !status)
          data.status = "<:invisible_status:938514572703309836>  Invisible";
        if (
          status === "online" &&
          data.device === "<:mobile_online_status:938514572728479826>  Mobile"
        )
          data.status = "<:mobile_online_status:938514572728479826>  Online";
        if (status === "online" && data.device === `${desktop_pc}  PC`)
          data.status = "<:online_status:938514574712406096>  Online";
        if (status === "idle")
          data.status = "<:idle_status:938514574771114014>  Idle";
        if (status === "dnd")
          data.status = "<:dnd_status:938514572824948816>  Do not disturb";
      }
    } catch (err) {
      console.log(err);
    }
  },
});
