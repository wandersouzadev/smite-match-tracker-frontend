interface GlobalMatches {
  wins: number;
  losses: number;
}

export const winRateCalcHelper = (matches: GlobalMatches) => {
  const totalGames = matches.wins + matches.losses;
  return ((matches.wins / totalGames) * 100).toFixed(2);
};
