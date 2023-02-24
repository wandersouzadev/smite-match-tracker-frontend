export const mmrToTierHelper = (mmr: number | string | null) => {
  if (!mmr) {
    return "";
  }
  switch (true) {
    case mmr <= 639:
      return "BRONZE";
    case mmr >= 640 && mmr <= 1204:
      return "Silver";
    case mmr >= 1205 && mmr <= 1524:
      return "Gold";
    case mmr >= 1525 && mmr <= 1999:
      return "Platinum";
    case mmr >= 2000 && mmr <= 2499:
      return "Diamond";
    case mmr >= 2500:
      return "Master";
    default:
      return "";
  }
};
