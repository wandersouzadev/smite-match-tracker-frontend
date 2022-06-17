import { SmiteGameMode } from "./game-mode";

export const smiteQueueHelper = (queueId: string | number | undefined) => {
  switch (queueId) {
    case "426":
      return "Normal Conquest";

    case "451":
      return "Ranked Conquest Season 9";

    case "448":
      return "Normal Joust";

    case "450":
      return "Ranked Joust Season 9";

    case "440":
      return "Ranked Duel Season 9";

    case "435":
      return "Normal Arena";

    case "445":
      return "Normal Assault";

    case "10189":
      return "Normal Slash";
    case "434":
      return "MOTD";
    default:
      return "";
  }
};

export const SmiteGameModeList = [
  SmiteGameMode.Arena,
  SmiteGameMode.Assault,
  SmiteGameMode.Conquest,
  SmiteGameMode.RankedConquest,
  SmiteGameMode.Joust,
  SmiteGameMode.RankedJoust,
  SmiteGameMode.RankedDuel,
  SmiteGameMode.Slash
];

export const playersCountByGameMode = (modeId: number) => {
  switch (modeId) {
    case SmiteGameMode.RankedDuel:
      return 1;
    case SmiteGameMode.Joust:
    case SmiteGameMode.RankedJoust:
      return 3;
    default:
      return 5;
  }
};
