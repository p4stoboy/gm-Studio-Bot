import {ready} from './ready';
import {InteractionCreate} from './InteractionCreate';
import {GuildCreate} from "./GuildCreate";

export const events = [
  ready,
  InteractionCreate,
  GuildCreate
];
