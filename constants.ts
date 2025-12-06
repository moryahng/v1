import { Participant } from './types';

export const PARTICIPANTS: Participant[] = [
  'Vicki',
  'Sandy',
  'Moryah',
  'Yoana',
  'Ivy',
  'Sam'
];

export const COLOURS = [
  'red', 'orange', 'yellow', 'green', 'blue', 'purple', 
  'black', 'white', 'grey', 'gold', 'silver'
];

export const ADJECTIVES = [
  "cozy", "funny", "useful", "luxurious", "minimal", 
  "cute", "practical", "surprising", "sentimental", 
  "handmade", "techy", "relaxing"
];

export const STORAGE_KEYS = {
  ASSIGNMENTS: 'giftAssignments',
  USER_CONFIG_PREFIX: 'config_', // We will append name to this
};