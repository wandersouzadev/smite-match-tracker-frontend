export const loadImgByTier = (
  tierId: string | number,
  mode: "Conquest" | "Joust" | "Duel"
) => {
  if (tierId === 1 || tierId <= 5) {
    return `${mode}/${mode}_Bronze.webp`;
  }

  if (tierId === 6 || tierId <= 10) {
    return `${mode}/${mode}_Silver.webp`;
  }

  if (tierId === 11 || tierId <= 15) {
    return `${mode}/${mode}_Gold.webp`;
  }

  if (tierId === 16 || tierId <= 20) {
    return `${mode}/${mode}_Platinum.webp`;
  }

  if (tierId === 21 || tierId <= 25) {
    return `${mode}/${mode}_Diamond.webp`;
  }

  if (tierId === 26) {
    return `${mode}/${mode}_Master.webp`;
  }

  if (tierId === 27) {
    return `${mode}/${mode}_GrandMasters.webp`;
  }
  return "";
};
