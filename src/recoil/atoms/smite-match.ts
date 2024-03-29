import { atom } from "recoil";

export interface SmiteMatch {
  queueId: string;
  streamerId: string;
  teams: SmiteTeam[];
}

export interface SmiteTeam {
  playerId: string;
  playerName: string;
  GodName: string;
  tierWins: number;
  tierLosses: number;
  taskForce: 1 | 2;
  playerRegion: string;
  Queue: string;
  Rank_Stat: number;
}

export const smiteMatchState = atom({
  key: "SmiteMatch",
  default: null as unknown as SmiteMatch | null
});
