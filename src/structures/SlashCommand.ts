import { SlashCommandType } from "../typings/SlashCommand";

export class SlashCommand {
  constructor(options: SlashCommandType) {
    Object.assign(this, options);
  }
}
