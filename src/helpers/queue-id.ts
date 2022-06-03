export const queueIdResolver = (queueId: string | undefined) => {
  switch (queueId) {
    case "426":
      return "Normal Conquest";

    case "451":
      return "Ranked Conquest Season 9";

    case "448":
      return "Normal Joust(3v3)";

    case "450":
      return "Ranked Joust(3v3) Season 9";

    case "440":
      return "Ranked Duel(1v1) Season 9";

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

export const isRankedMatch = (queueId: string | undefined) => {
  const rankedQueues = ["451", "450", "440"];
  return rankedQueues.includes(queueId || "");
};
