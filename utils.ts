import { AssignmentMap, Participant, UserConfig, SummaryRow } from './types';
import { PARTICIPANTS, STORAGE_KEYS } from './constants';

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Generates a valid derangement (no one assigned to themselves)
const generateDerangement = (names: Participant[]): AssignmentMap => {
  let shuffled = shuffleArray(names);
  let isValid = false;

  // Keep shuffling until no one is assigned to themselves
  while (!isValid) {
    isValid = true;
    for (let i = 0; i < names.length; i++) {
      if (names[i] === shuffled[i]) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      shuffled = shuffleArray(names);
    }
  }

  const map: Partial<AssignmentMap> = {};
  names.forEach((name, index) => {
    map[name] = shuffled[index];
  });

  return map as AssignmentMap;
};

export const getOrInitAssignments = (): AssignmentMap => {
  const stored = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  if (stored) {
    try {
      return JSON.parse(stored) as AssignmentMap;
    } catch (e) {
      console.error("Failed to parse assignments, regenerating", e);
    }
  }

  const newAssignments = generateDerangement(PARTICIPANTS);
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(newAssignments));
  return newAssignments;
};

export const getUserConfig = (name: Participant): UserConfig | null => {
  const stored = localStorage.getItem(`${STORAGE_KEYS.USER_CONFIG_PREFIX}${name}`);
  if (stored) {
    return JSON.parse(stored) as UserConfig;
  }
  return null;
};

export const saveUserConfig = (name: Participant, config: UserConfig): void => {
  localStorage.setItem(`${STORAGE_KEYS.USER_CONFIG_PREFIX}${name}`, JSON.stringify(config));
};

export const getGroupSummary = (): SummaryRow[] => {
  return PARTICIPANTS.map(name => {
    const config = getUserConfig(name);
    return {
      name,
      colour: config ? config.colour : null,
      adjective: config ? config.adjective : null,
      isDone: !!config
    };
  });
};