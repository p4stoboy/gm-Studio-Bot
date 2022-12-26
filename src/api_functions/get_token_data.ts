import {TokenData} from "../types/TokenData";
import fetch from "node-fetch";

export const get_token_data = async (collection_slug: string, token_id: number): Promise<TokenData> => {
  const response = await fetch(`https://api.gmstudio.art/collections/${collection_slug}/token/${token_id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as TokenData;
}
