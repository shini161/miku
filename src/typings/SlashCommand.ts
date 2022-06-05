import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: ExtendedClient;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type SlashCommandType = {
  userPermissions?: PermissionResolvable[];
  cooldown?: number | "Module";
  channel_type?: "GUILD_ONLY" | "DM_ONLY" | "ALL";
  run: RunFunction;
} & ChatInputApplicationCommandData;
