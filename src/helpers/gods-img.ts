export const cdnGodsImgLoad = (
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

  const godSkinName = smiteGodName
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("'", "");

  if (godName === "da-ji") {
    godName = "daji";
  }
  return `https://webcdn.hirezstudios.com/smite/god-skins/${godSkinName}_standard-${godName}.jpg`;
};
