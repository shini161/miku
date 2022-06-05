import { Command } from "../../structures/Command";
import { Permissions } from "discord.js";
import getPrefix from "../../utils/getPrefix";
import config from "../../config.json";
import sql from "../../structures/Database";

export default new Command({
    name: "prefix",
    usages: "$PREFIX$prefix ~> to see current settings\n$PREFIX$prefix [prefix]",
    channel_type: "GUILD_ONLY",
    required: true,

    run: async ({ client, message, args }) => {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return message.reply({
                content: "You don't have permission to run this command!",
            });

        if (!args[0]) {
            let prefix = await getPrefix(message.guild.id);
            return message.reply({
                content: `The current prefix set for this guild is **${prefix}**`,
            });
        }

        if (args[0].length > 12)
            return message.reply({
                content: "Prefix length must not exced 12 characters!",
            });

        if (args[0].toLowerCase() === "null") return resetPrefix();

        await setPrefix(args[0].toLowerCase());

        async function setPrefix(customPrefix: string) {
            if (customPrefix === config.prefix)
                await sql`UPDATE guilds SET prefix = NULL WHERE id = ${message.guild.id}`;
            else
                await sql`UPDATE guilds SET prefix = ${customPrefix} WHERE id = ${message.guild.id}`;
            return message.reply({
                content: `The prefix has been set to **${customPrefix}**`,
            });
        }

        async function resetPrefix() {
            let prefix = await getPrefix(message.guild.id);
            if (prefix === config.prefix)
                return message.reply({
                    content: "The prefix has been reset for this guild!",
                });
            await sql`UPDATE guilds SET prefix = NULL WHERE id = ${message.guild.id}`;
            return message.reply({
                content: "The prefix has been reset for this guild!",
            });
        }
    },
});
