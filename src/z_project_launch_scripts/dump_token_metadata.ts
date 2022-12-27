import fetch from 'node-fetch';
import fs from 'fs';
import {collections} from "../collections";
import { regex_filter} from "./discord_command_regex";


// TODO: Only need to do single collection with each new drop -> remove outer loop and define `collection` as the new collection object (in '../collections')
const dump_token_metadata = async () => {
  for (let collection of collections) {
    const current = [];
    for (let id = 0; id < collection.size; id++) {
      console.log(collection.name + ": " + id);
      const response = await fetch(`https://api.gmstudio.art/collections/${collection.slug}/token/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const token_data = await response.json();
      // map attribute strings to Discord command compliant strings
      const new_attributes: {[key: string]: string} = {};
      for (let [key, value] of Object.entries(token_data.attributes)) {
        // @ts-ignore
        new_attributes[key.replace(regex_filter, "_").toLowerCase()] = value.toString().replace(regex_filter, "_").toLowerCase();
      }
      token_data.attributes = new_attributes;
      current.push(token_data);
    }
    const json = {"root": current};

    // for (let token of json.root) {
    //   const new_attributes: {[key: string]: string} = {};
    //   for (let [key, value] of Object.entries(token.attributes)) {
    //     // @ts-ignore
    //     new_attributes[key.replace(regex_filter, "_").toLowerCase()] = value.toString().replace(regex_filter, "_").toLowerCase();
    //   }
    //   token.attributes = new_attributes;
    // }
    fs.writeFileSync(`./src/token_metadata/${collection.slug}.json`, JSON.stringify(json));
  }
}

dump_token_metadata();
