import { Message } from "discord.js";
import { ExtendedClient } from "../structures/Client";

interface RunOptions {
  client: ExtendedClient;
  message: Message<boolean>;
  args: string[];
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  name: string;
  usages?: string;
  aliases?: string[];
  cooldown?: number | "Module";
  channel_type?: "GUILD_ONLY" | "DM_ONLY" | "ALL";
  required?: boolean;
  run: RunFunction;
};
