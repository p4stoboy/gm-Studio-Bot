import {TokenData} from "../types/TokenData";
import {EmbedBuilder, HexColorString} from "discord.js";


export const token_embed = (token_data: TokenData, color: HexColorString, collection: any): EmbedBuilder => {
  const embed = new EmbedBuilder();
  embed.setTitle(token_data.name);
  embed.setURL(token_data.image);
  embed.setAuthor({name: collection.author, url: collection.twitter});
  embed.setColor(color);
  embed.setImage(token_data.image);
  return embed;
}