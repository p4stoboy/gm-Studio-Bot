import {GMCollection} from "./types/GMCollection";

import * as collection_data from "./collections.json";
import fs from "fs";

export const collections: GMCollection[] = collection_data.collections.map((collection) => {
  const tokens = JSON.parse(fs.readFileSync(`./src/token_metadata/${collection.slug}.json`).toString());
  const attributes = JSON.parse(fs.readFileSync(`./src/token_metadata/${collection.slug}_attribute_dictionary.json`).toString());
  return {
    ...collection,
    tokens: tokens.root,
    attributes: attributes.root
  }
});

