import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import { SlashCommandType } from "../typings/SlashCmds";
import { CommandType } from "../typings/Command";
import { Event } from "./Event";
import { RegisterCommandsOptions } from "../typings/client";
import { psql } from "./Database";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  slashCmds: Collection<string, SlashCommandType> = new Collection();

  constructor() {
    super({
      intents: 32767,
      partials: ["MESSAGE", "CHANNEL", "REACTION"],
      allowedMentions: { parse: ["users", "roles"], repliedUser: false },
    });
  }

  start() {
    this.registerModules();
    this.connectDatabase();
    this.login(process.env.TOKEN);
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async connectDatabase() {
    psql
      .connect()
      .then(() => {
        console.log("I connected to the Database! [PostgreSQL]");
      })
      .catch((err) => {
        console.log("I couldn't connect to the Database! [PostgreSQL]");
        console.log(err.stack);
        return;
      });
    psql.on("error", (err) => {
      console.log("I disconnected from the Database! [PostgreSQL]");
      console.log(err.stack);
      return;
    });
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering SlashCommands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global SlashCommands");
    }
  }

  async registerModules() {
    // Slash Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const slashCmdsFiles = await globPromise(
      `${__dirname}/../slashCmds/*/*{.ts,.js}`
    );
    slashCmdsFiles.forEach(async (filePath) => {
      const slashCommand: SlashCommandType = await this.importFile(filePath);
      if (!slashCommand?.name) return;
      // console.log(slashCommand);
      this.slashCmds.set(slashCommand.name, slashCommand);
      slashCommands.push(slashCommand);
    });

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.GUILD,
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });

    // Prefix Commands
    const prefixCmds = [];
    const prefixCmdsFiles = await globPromise(
      `${__dirname}/../modules/**/*{.ts,.js}`
    );
    prefixCmdsFiles.forEach(async (filePath) => {
      const prefixCommand: CommandType = await this.importFile(filePath);
      if (!prefixCommand?.name) return;
      // console.log(prefixCommand);
      this.commands.set(prefixCommand.name, prefixCommand);
      prefixCmds.push(prefixCommand);
    });
  }
}
