import { Command } from "../../structures/Command";
import getLangGuild from "../../utils/getLang-guild";
import langs from "../../../assets/langs/langs";
import { MessageAttachment, Permissions } from "discord.js";

export default new Command({
  name: "list-roles",
  usages: "$PREFIX$list-roles",
  cooldown: 1000 * 10,
  channel_type: "GUILD_ONLY",
  required: true,

  run: async ({ message }) => {
    const lang = await getLangGuild(message.guildId);

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.reply({
        content: langs[lang].common.missing_permission.command.user,
      });
    if (message.guild.roles.cache.size === 0)
      return message.reply({
        content: langs[lang].modules.utility.listRoles.noRoles,
      });

    let roles = "";
    message.guild.roles.cache.map(
      (role) => (roles += `${role.name} [${role.id}]\n\n`)
    );
    const buffer = Buffer.from(roles, "utf-8");

    message.channel.send({
      files: [new MessageAttachment(buffer, "roles.txt")],
    });
  },
});
