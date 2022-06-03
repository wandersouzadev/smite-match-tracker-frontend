export const cdnUrlHelper = (text: string) => {
  const godName = text.toLocaleLowerCase();
  const godSkin = godName.replaceAll(" ", "_").replaceAll("'", "");
  let god = godName.replaceAll(" ", "-").replaceAll("'", "");
  if (god === "da-ji") {
    god = "daji";
  }
  return `https://webcdn.hirezstudios.com/smite/god-skins/${godSkin}_standard-${god}.jpg`;
};
