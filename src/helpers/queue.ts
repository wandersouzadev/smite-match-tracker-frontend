import { SmiteGameMode } from "./game-mode";

export const smiteQueueHelper = (queueId: string | number | undefined) => {
  switch (queueId) {
    // CONQUEST //
    case 426:
    case "426":
    case 10193:
    case "10193":
      return "Normal Conquest";
    case 451:
    case "451":
      return "Ranked Conquest";
    case 504:
    case "504":
      return "Ranked Conquest Controller";
    // ---- //

    // JOUST //
    case 448:
    case "448":
    case 10197:
    case "10197":
      return "Normal Joust";
    case 450:
    case "450":
      return "Ranked Joust";
    case 503:
    case "503":
      return "Ranked Joust Controller";

    // ---- //

    // DUEL //
    case 440:
    case "440":
      return "Ranked Duel";
    case 502:
    case "502":
      return "Ranked Duel Controller";
    //

    // ARENA //
    case 435:
    case "435":
    case 10195:
    case "10195":
      return "Arena";
    // ---- //

    // ASSAULT //
    case 445:
    case "445":
      return "Assault";
    // ---- //

    // SIEGE //
    case 459:
    case "459":
      return "Siege";
    // ---- //

    // SLASH //
    case 10189:
    case "10189":
      return "Slash";
    // ---- ///

    // MOTD //
    case 434:
    case "434":
      return "MOTD";
    // ---- //

    // CUSTOM QUEUES //
    case 429:
    case "429":
      return "Custom Conquest";
    case 10190:
    case "10190":
      return "Custom Duel";
    case 441:
    case "441":
      return "Custom Joust";
    case 438:
    case "438":
      return "Custom Arena";
    case 446:
    case "446":
      return "Custom Assault";
    // ---- //

    // JUNGLE PRACTICE //
    case 444:
    case "444":
      return "Jungle Practice";
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
  SmiteGameMode.Slash,
  SmiteGameMode.Siege,
  SmiteGameMode.MOTD,
  SmiteGameMode.CustomArena,
  SmiteGameMode.CustomAssault,
  SmiteGameMode.CustomConquest,
  SmiteGameMode.CustomDuel,
  SmiteGameMode.CustomJoust,
  SmiteGameMode.CustomSlash,
  SmiteGameMode.CustomSiege,
  SmiteGameMode.JunglePractice
];

export const playersCountByGameModeHelper = (modeId: number) => {
  switch (modeId) {
    case SmiteGameMode.MOTD:
      return 0;

    case SmiteGameMode.RankedDuel:
    case SmiteGameMode.RankedDuelController:
    case SmiteGameMode.CustomDuel:
      return 1;

    case SmiteGameMode.Under30Joust:
    case SmiteGameMode.Joust:
    case SmiteGameMode.RankedJoust:
    case SmiteGameMode.RankedJoustController:
    case SmiteGameMode.CustomJoust:
      return 3;

    case SmiteGameMode.Siege:
    case SmiteGameMode.CustomSiege:
      return 4;

    default:
      return 5;
  }
};
