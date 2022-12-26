import {ApplicationCommandData} from "discord.js";
import command_objects from "./create_commands";

export const commands_array: ApplicationCommandData[] = [];
export const commands = new Map<string, ApplicationCommandData>();
for (let command of command_objects) {
  commands_array.push(command);
  commands.set(command.name, command);
}
