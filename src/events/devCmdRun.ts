import { Event } from "../structures/Event";
import { client } from "..";
import { GuildChannelResolvable, Permissions } from "discord.js";
import config from "../config.json";
import getPrefix from "../utils/getPrefix";

export default new Event("messageCreate", async (message) => {
    if (message.author.bot) return;
    const prefix = await getPrefix(message.guildId);
    const clientId = client.user.id;

    // const prefixes = [prefix, `${client.user} `, `${message.guild.me} `];
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

    const command =
        client.devCmds.get(cmd.toLowerCase()) ||
        client.devCmds.find((c) => c.aliases?.includes(cmd.toLowerCase()));
    if (!command) return;

    if (command.ownerOnly) {
        if (message.author.id !== config.ownerId) return;
    }

    await checkRequired();
    async function checkRequired() {
        if (command.required) {
            if (
                !message.guild.me
                    .permissionsIn(message.channel as GuildChannelResolvable)
                    .has(Permissions.FLAGS.SEND_MESSAGES) &&
                !message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            )
                return;
            await command.run({ client, message, args });
        }
        try {
            await command.run({ client, message, args });
        } catch (err) {
            console.log(err);
        }
    }
});
