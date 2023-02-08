export const SmiteRegionFlagsHelper = (regionName: string) => {
  switch (regionName) {
    case "Brazil":
      return "Flags/br.png";
    case "EU":
      return "Flags/eu.png";
    case "Latam":
      return "Flags/latam.png";
    default:
      return "Flags/na.png";
  }
};
