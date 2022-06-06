import { DevCommand } from "../../structures/DevCommand";
import Colors from "../../../assets/colors.json";
import { ColorResolvable } from "discord.js";

export default new DevCommand({
  name: "guilds",
  usages: "$PREFIX$guilds [all/top-<Integer>]",
  ownerOnly: true,

  run: async ({ client, message, args }) => {
    const query = args.join(" ").toLowerCase();
    const color = Colors.celestialBlue;

    if (query === "top10") {
      const guilds = client.guilds.cache.sort((a, b) => {
        return b.memberCount - a.memberCount;
      });
      const top10 = guilds.first(10);
      let embed = {
        title: "Top 10 guilds!",
        fields: [],
        timestamp: new Date(),
        color: color as ColorResolvable,
      };
      for (const guild of top10) {
        const guildOwner = await guild
          .fetchOwner()
          .then((user) => user.user.username);
        embed.fields.push({
          name: `${guild.name} [${guild.id}]`,
          value: `MemberCount: ${guild.memberCount}\nGuildOwner: ${guildOwner} [${guild.ownerId}]`,
        });
      }

      await message.reply({
        embeds: [embed],
      });
    }
  },
});
