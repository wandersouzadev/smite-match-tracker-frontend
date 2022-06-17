import { SmiteMatchPlayer } from "./match-player";

export interface SmiteLiveMatch {
  accountId: string;
  queueId: string;
  status: "Offline" | "In Lobby" | "God Selection" | "In Game";
  teamsData: SmiteMatchPlayer[];
}
