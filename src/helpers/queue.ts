import { SmiteGameMode } from "./game-mode";

export const smiteQueueHelper = (queueId: string | number | undefined) => {
  switch (queueId) {
    // CONQUEST //
    case "426":
    case "10193":
      return "Normal Conquest";
    case "451":
      return "Ranked Conquest Season 9";
    case "504":
      return "Ranked Conquest Season 9 Controller";
    // ---- //

    // JOUST //
    case "448":
    case "10197":
      return "Normal Joust";
    case "450":
      return "Ranked Joust Season 9";
    case "503":
      return "Ranked Joust Season 9 Controller";

    // ---- //

    // DUEL //
    case "440":
      return "Ranked Duel Season 9";
    case "502":
      return "Ranked Duel Season 9 Controller";
    //

    // ARENA //
    case "435":
    case "10195":
      return "Normal Arena";
    // ---- //

    // ASSAULT //

    case "445":
      return "Normal Assault";
    // ---- //

    // SLASH //
    case "10189":
      return "Normal Slash";
    // ---- ///

    // MOTD //
    case "434":
      return "MOTD";
    // ---- //
    default:
      return "";
  }
};

export const SmiteGameModeList = [
  SmiteGameMode.Under30Arena,
  SmiteGameMode.Arena,
  SmiteGameMode.Assault,
  SmiteGameMode.Under30Conquest,
  SmiteGameMode.Conquest,
  SmiteGameMode.RankedConquest,
  SmiteGameMode.RankedConquestController,
  SmiteGameMode.Under30Joust,
  SmiteGameMode.Joust,
  SmiteGameMode.RankedJoust,
  SmiteGameMode.RankedJoustController,
  SmiteGameMode.RankedDuel,
  SmiteGameMode.RankedDuelController,
  SmiteGameMode.Slash
];

export const playersCountByGameMode = (modeId: number) => {
  switch (modeId) {
    case SmiteGameMode.RankedDuel:
    case SmiteGameMode.RankedDuelController:
      return 1;
    case SmiteGameMode.Under30Joust:
    case SmiteGameMode.Joust:
    case SmiteGameMode.RankedJoust:
    case SmiteGameMode.RankedJoustController:
      return 3;
    default:
      return 5;
  }
};
