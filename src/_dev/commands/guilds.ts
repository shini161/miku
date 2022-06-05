import { DevCommand } from "../../structures/DevCommand";

export default new DevCommand({
  name: "guilds",
  usages: "$PREFIX$guilds [all/top-<Integer>]",
  ownerOnly: true,

  run: async ({ client, message, args }) => {},
});
