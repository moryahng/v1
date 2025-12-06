export type Participant = 'Vicki' | 'Sandy' | 'Moryah' | 'Yoana' | 'Ivy' | 'Sam';

export interface UserConfig {
  colour: string;
  adjective: string;
}

export type AssignmentMap = Record<Participant, Participant>;

export enum AppStep {
  LANDING = 0,
  DRAW_COLOUR = 1,
  DRAW_ADJECTIVE = 2,
  RESULT = 3,
}

export interface SummaryRow {
  name: Participant;
  colour: string | null;
  adjective: string | null;
  isDone: boolean;
}