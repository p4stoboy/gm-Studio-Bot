import {collections} from "../collections";
import {
  ChatInputCommandInteraction, EmbedBuilder,
  HexColorString,
  MessageApplicationCommandData,
} from "discord.js";
import {choose} from "../helpers";
import {get_token_data} from "../api_functions/get_token_data";
import {token_embed} from "../discord_functions/token_embed";

// this checks whether the image loaded in to the embed after 10 seconds, if not it resends the embed alternating between
// max quality (95) and pretty good (80) until the image resolves.
// quality gets alternated because the URL needs to change for Discord to retry the request, but we don't want to drop it
// too low so we alternate.
const check_retry = async (interaction: ChatInputCommandInteraction, _embed: EmbedBuilder, url: string, side = 1) => {
  const message = await interaction.fetchReply();
  if (!message) throw new Error('no message found');
  const embed = message.embeds[0];
  if (embed.image?.width === 0) {
    await interaction.editReply({embeds: [_embed.setImage((side < 0 ? url : url + '?img-quality=80'))]});
    setTimeout(async () => await check_retry(interaction, _embed, url, -side), 10000);
  }
}

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
  const hex = '#2F3136';
  const embed = token_embed(token_data, hex as HexColorString, collection);

  const message = await interaction.editReply({embeds: [embed]}).catch((e) => console.log(e));
  if (!message) return;
  setTimeout(async () => await check_retry(interaction, embed, token_data.image), 10000);
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


