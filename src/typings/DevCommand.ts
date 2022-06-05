import { Message } from "discord.js";
import { ExtendedClient } from "../structures/Client";

interface RunOptions {
  client: ExtendedClient;
  message: Message<boolean>;
  args: string[];
}

type RunFunction = (options: RunOptions) => any;

export type DevCommandType = {
  name: string;
  usages?: string;
  aliases?: string[];
  required?: boolean;
  ownerOnly?: boolean;
  run: RunFunction;
};
