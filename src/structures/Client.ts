import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import { DevSlashCommandType } from "../typings/DevSlashCommand";
import { SlashCommandType } from "../typings/SlashCommand";
import { DevCommandType } from "../typings/DevCommand";
import { CommandType } from "../typings/Command";
import { Event } from "./Event";
import { RegisterCommandsOptions } from "../typings/client";
import config from "../config.json";
import { LavasfyClient } from "lavasfy";
import { Manager } from "erela.js";
import { Server } from "socket.io";
import deezer from "erela.js-deezer";
import facebook from "erela.js-facebook";
import apple from "erela.js-apple";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  slashCmds: Collection<string, SlashCommandType> = new Collection();
  devCmds: Collection<string, DevCommandType> = new Collection();
  devSlashCmds: Collection<string, DevSlashCommandType> = new Collection();

  constructor() {
    super({
      intents: 32767,
      partials: ["MESSAGE", "CHANNEL", "REACTION"],
      allowedMentions: { parse: ["users", "roles"], repliedUser: false },
    });
  }

  start() {
    this.registerModules();
    this.login(process.env.TOKEN);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    const globally = false;
    if (guildId && !globally) {
      await this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering SlashCommands to ${guildId}`);
    } else {
      await this.application?.commands.set(commands);
      console.log("Registering global SlashCommands");
    }
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];

    // Slash Commands
    const slashCmdsFiles = await globPromise(
      `${__dirname}/../slashCmds/*{.ts,.js}`
    );
    for (const filePath of slashCmdsFiles) {
      const command: SlashCommandType = await this.importFile(filePath);
      if (!command?.name) continue;
      // console.log(command);
      this.slashCmds.set(command.name, command);
      slashCommands.push(command);
    }

    // Developer Slash Commands
    const devSlashCmdsFiles = await globPromise(
      `${__dirname}/../_dev/slashCmds/*{.ts,.js}`
    );
    for (const filePath of devSlashCmdsFiles) {
      const command: DevSlashCommandType = await this.importFile(filePath);
      if (!command?.name) continue;
      // console.log(command);
      this.devSlashCmds.set(command.name, command);
      slashCommands.push(command);
    }

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: config.guildId,
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    for (const filePath of eventFiles) {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    }

    // Prefix Commands
    const prefixCmds = [];
    const prefixCmdsFiles = await globPromise(
      `${__dirname}/../modules/**/*{.ts,.js}`
    );
    for (const filePath of prefixCmdsFiles) {
      const command: CommandType = await this.importFile(filePath);
      if (!command?.name) continue;
      // console.log(command);
      this.commands.set(command.name, command);
      prefixCmds.push(command);
    }

    // Developer Prefix Commands
    const devPrefixCmds = [];
    const devPrefixCmdsFiles = await globPromise(
      `${__dirname}/../_dev/commands/*{.ts,.js}`
    );
    for (const filePath of devPrefixCmdsFiles) {
      const command: DevCommandType = await this.importFile(filePath);
      if (!command?.name) continue;
      // console.log(command);
      this.devCmds.set(command.name, command);
      devPrefixCmds.push(command);
    }

    // Music Commands
  }
}
