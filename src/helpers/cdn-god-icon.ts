export const cdnGodIconHelper = (
  smiteGodName: string,
  options?: { replaceUnderscore: boolean }
) => {
  let godName = smiteGodName
    .toLocaleLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("'", "");

  if (options?.replaceUnderscore) {
    godName = godName.replaceAll("_", "-");
  }

  return `https://webcdn.hirezstudios.com/smite/god-icons/${godName}.jpg`;
};
