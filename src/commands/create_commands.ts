import {collections} from "../collections";
import {
  MessageApplicationCommandData,
} from "discord.js";
import {gm_func} from "./token_resolver";

////////
// build all collections commands
const command_objects: MessageApplicationCommandData[] = [];

for (let collection of collections) {
  //build colleciton attribute options
  const attribute_options = [];
  for (let attribute of collection.attributes) {
    const option = {
      name: attribute.name,
      description: attribute.name,
      type: 3,
      required: false,
      choices: attribute.values.map(x => ({name: x, value: x}))
    }
    attribute_options.push(option);
  }
  const command_object = {
    name: collection.slug,
    description: `get a ${collection.name}`,
    options: [
      {
        name: `token_id`,
        description: `optional: ${collection.name} id | overrides traits | default: random`,
        type: 4,
        required: false,
        minValue: 0,
        maxValue: collection.size - 1
      },
        ...attribute_options
    ],
    type: 1,
    execute: gm_func
  }
  command_objects.push(command_object);
}

const global_random = {
  name: "random",
  description: `get a random gm.studio token`,
  execute: gm_func,
  type: 1
}

command_objects.push(global_random);

export default command_objects;


