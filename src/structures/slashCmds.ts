import { SlashCommandType } from "../typings/slashCmds";

export class SlashCommand {
  constructor(options: SlashCommandType) {
    Object.assign(this, options);
  }
}
