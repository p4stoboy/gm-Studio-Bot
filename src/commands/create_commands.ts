import {collections} from "../collections";
import {
  ChatInputCommandInteraction,
  HexColorString,
  MessageApplicationCommandData,
} from "discord.js";
import {choose} from "../helpers";
import {get_token_data} from "../api_functions/get_token_data";
import {token_embed} from "../discord_functions/token_embed";


// function to parse all collections commands and return token to interaction
const gm_func = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();
  // bad filter to coerce collection
  const filter = collections.filter(x => x.slug === interaction.commandName)[0];
  const collection = filter ? filter : choose(collections);

  // get token id
  const expected_id = `${collection.slug}_token_id`;
  const id = interaction.options.get(expected_id) ? interaction.options.get(expected_id)?.value as number
    : Math.floor(Math.random() * collection.size);

  // TODO: keep an eye out for conditional option implementations so we can not have a separate command
  //  for each collection whilst retaining the appropriate parameter coercions

  //get token data
  const token_data = await get_token_data(collection.slug, id).catch((e) => console.log(e));
  if (!token_data) return;
  //build embed
  const hex = '#00000000';
  const embed = token_embed(token_data, hex as HexColorString, collection);

  const message = await interaction.editReply({embeds: [embed]});
}

const command_objects: MessageApplicationCommandData[] = [];

for (let collection of collections) {
  const command_object = {
    name: collection.slug,
    description: `get a ${collection.name}`,
    options: [
      {
        name: `${collection.slug}_token_id`,
        description: `optional: ${collection.name} id | default: random`,
        type: 4,
        required: false,
        minValue: 0,
        maxValue: collection.size - 1
      }
    ],
    type: 1,
    execute: gm_func
  }
  command_objects.push(command_object);
}

const global_random = {
  name: "all_collections",
  description: `get a random gm.studio token`,
  execute: gm_func,
  type: 1
}

command_objects.push(global_random);

export default command_objects;


