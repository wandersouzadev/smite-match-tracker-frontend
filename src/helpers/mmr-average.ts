import { SmiteMatchPlayer } from "@/typings/smite/match-player";
import { SmiteGameMode } from "./game-mode";

export const mmrAverageHelper = (smitePlayer: SmiteMatchPlayer[]) => {
  const queue = Number(smitePlayer[0].Queue);

  const average = smitePlayer.reduce((prev, current) => {
    return { ...current, Rank_Stat: prev.Rank_Stat + current.Rank_Stat };
  });

  switch (queue) {
    case SmiteGameMode.RankedDuel:
    case SmiteGameMode.RankedDuelController:
      return average.Rank_Stat.toFixed(0);
    case SmiteGameMode.Joust:
    case SmiteGameMode.RankedJoust:
    case SmiteGameMode.RankedJoustController:
    case SmiteGameMode.Under30Joust:
      return (average.Rank_Stat / 3).toFixed(0);
    case SmiteGameMode.Slash:
    case SmiteGameMode.Arena:
    case SmiteGameMode.Assault:
    case SmiteGameMode.Under30Conquest:
    case SmiteGameMode.Conquest:
    case SmiteGameMode.RankedConquest:
    case SmiteGameMode.RankedConquestController:
      return (average.Rank_Stat / 5).toFixed(0);
    default:
      return null;
  }
};
