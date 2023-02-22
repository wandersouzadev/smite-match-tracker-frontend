export const cdnItemsImgHelper = (itemName: string) => {
  let fixedItemName = itemName
    .toLowerCase()
    .replace("s8 ", "")
    .replace("s9 ", "")
    .replace(" *old*", "")
    .replace(" (old)", "")
    .replaceAll(" ", "-")
    .replaceAll("'", "");

  if (fixedItemName === "cloak-of-meditation") {
    fixedItemName = "meditation-cloak";
  }

  if (fixedItemName === "cloak-of-avatar") {
    fixedItemName = "cloak-of-the-avatar";
  }

  return `https://webcdn.hirezstudios.com/smite/item-icons/${fixedItemName}.jpg`;
};
