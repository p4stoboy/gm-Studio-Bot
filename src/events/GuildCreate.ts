import {Events, Guild} from "discord.js";
import {commands_array} from "../commands";


export const GuildCreate = {
  name: Events.GuildCreate,
  once: false,
  execute: async (guild: Guild) => {
    try {
      await guild.commands.set(commands_array);
      console.log(`Successfully registered application commands in ${guild.name}.`);
    } catch(e) {
      console.log(e);
      console.error(`Error registering commands in guild ${guild.name}, id: ${guild.id}`);
    }
  },
}
