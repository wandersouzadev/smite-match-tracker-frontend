export const cdnGodsImgLoad = (smiteGodName: string) => {
  let godName = smiteGodName
    .toLocaleLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("'", "");
  const godSkinName = smiteGodName
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("'", "");

  if (godName === "da-ji") {
    godName = "daji";
  }
  return `https://webcdn.hirezstudios.com/smite/god-skins/${godSkinName}_standard-${godName}.jpg`;
};
