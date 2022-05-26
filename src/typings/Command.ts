import { ApplicationCommand, GuildMember, Message } from "discord.js";
import { ExtendedClient } from "../structures/Client";

export interface ExtendedCommand extends ApplicationCommand {
  member: GuildMember;
}

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
  cooldown?: number;
  channel_type?: "GUILD_ONLY" | "DM_ONLY" | "ALL";
  required?: boolean;
  run: RunFunction;
};
