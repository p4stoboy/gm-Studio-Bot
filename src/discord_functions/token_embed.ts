import {TokenData} from "../types/TokenData";
import {EmbedBuilder, HexColorString} from "discord.js";
import * as config from '../config.json';


export const token_embed = (token_data: TokenData, color: HexColorString, collection: any, is_traits: boolean, traits: string): EmbedBuilder => {
  const embed = new EmbedBuilder();
  embed.setTitle(token_data.name);
  embed.setURL(`https://sansa.xyz/asset/${collection.contract}/${token_data.tokenId}`);
  embed.setAuthor({name: collection.author, url: collection.twitter});
  embed.setColor(color);
  embed.setImage(token_data.image);
  embed.setFooter({text: 'gm.studio', iconURL: config.avatar_url})
  if (is_traits && traits !== '') {
    embed.addFields([{name: 'Filter', value: traits, inline: false}]);
  }
  return embed;
}
