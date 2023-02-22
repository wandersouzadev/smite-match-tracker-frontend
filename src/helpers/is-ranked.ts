import { SmiteGameMode } from "./game-mode";

export const isRankedHelper = (queueId: number) => {
  const rankedQueueIds = [
    SmiteGameMode.RankedConquest,
    SmiteGameMode.RankedConquestController,
    SmiteGameMode.RankedJoust,
    SmiteGameMode.RankedJoustController
  ];
  return rankedQueueIds.includes(queueId);
};
