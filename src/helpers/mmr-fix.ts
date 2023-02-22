export const mmrFixHelper = (mmr: number) => {
  if (mmr === 0) {
    return 1500;
  }
  return mmr;
};
