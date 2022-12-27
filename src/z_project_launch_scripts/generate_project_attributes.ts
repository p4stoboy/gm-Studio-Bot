import * as mind_the_gap_tokens from "../token_metadata/mind-the-gap.json";
import * as plasticity_tokens from "../token_metadata/plasticity.json";
import * as koripo_tokens from "../token_metadata/koripo.json";
import * as factura_tokens from "../token_metadata/factura.json";
import * as catharsis_tokens from "../token_metadata/catharsis.json";
import * as apollo_tokens from "../token_metadata/apollo.json";
import fs from 'fs';
import {regex_filter} from "./discord_command_regex";
import * as collection_data from '../collections.json';

const collections = collection_data.collections;

const projects = [
  mind_the_gap_tokens.root,
  plasticity_tokens.root,
  koripo_tokens.root,
  factura_tokens.root,
  catharsis_tokens.root,
  apollo_tokens.root,
];

const valid = (s: string) => s.replace(regex_filter, '_').toLowerCase();
// Generate feature map for each collection and
// map attribute strings to Discord command compliant strings
// TODO: Only need to do single collection with each new drop -> remove outer loop and define project as the new collection object
for (let project of projects) {
  let attributes: {name: string, values: string[]}[] = [];
  for (let token of project) {
    const token_attributes = token.attributes;
    for (let [key, value] of Object.entries(token_attributes)) {
      const array_has_key = attributes.some((attribute) => attribute.name === valid(key));
      if (!array_has_key) {
        attributes.push({name: valid(key), values: [valid(value.toString())]});
      } else {
        const array_has_value = attributes.some((attribute) => {
          return attribute.values.includes(valid(value.toString())) && attribute.name === valid(key);
        });
        if (!array_has_value) {
          attributes.find((attribute) => attribute.name === valid(key))?.values.push(valid(value.toString()));
        }
      }
    }
  }
  const json = {root: attributes};
  fs.writeFileSync(`./src/token_metadata/${collections[project[0].collectionId - 1].slug}_attribute_dictionary.json`, JSON.stringify(json, null, 2));
}
