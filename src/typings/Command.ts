import {
  ApplicationCommand,
  ChatInputApplicationCommandData,
  GuildMember,
  Message,
  PermissionResolvable,
} from "discord.js";
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
  aliases?: string[];
  required?: boolean;
  run: RunFunction;
};
