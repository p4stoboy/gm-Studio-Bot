import {Client, Events} from 'discord.js';
import {commands_array} from "../commands";
import * as config from "../config.json";

export const ready = {
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setAvatar(config.avatar_url).catch((e) => console.log(e));
    client.user?.setUsername("gm.collections");
    client.guilds.cache.forEach(async (guild) => {
      try {
        await guild.commands.set(commands_array);
        console.log(`Successfully registered application commands in ${guild.name}.`);
      } catch(e) {
        console.log(e);
        console.error(`Error registering commands in guild ${guild.name}, id: ${guild.id}`);
      }
    });
  },
}
