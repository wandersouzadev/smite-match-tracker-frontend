import { SmiteMatchPlayer } from "./match-player";

export interface SmiteLiveMatch {
  accountName: string;
  accountId: string;
  queueId: string;
  status: "Offline" | "In Lobby" | "God Selection" | "In Game" | "Unknown";
  teamsData: SmiteMatchPlayer[];
}
