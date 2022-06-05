import { DevSlashCommandType } from "../typings/DevSlashCommand";

export class DevSlashCommand {
  constructor(options: DevSlashCommandType) {
    Object.assign(this, options);
  }
}
