export const tierNameById = (tierId?: string | number) => {
  switch (tierId?.toString()) {
    case "1":
      return "Bronze V";
    case "2":
      return "Bronze IV";
    case "3":
      return "Bronze III";
    case "4":
      return "Bronze II";
    case "5":
      return "Bronze I";
    case "6":
      return "Silver V";
    case "7":
      return "Silver IV";
    case "8":
      return "Silver III";
    case "9":
      return "Silver II";
    case "10":
      return "Silver I";
    case "11":
      return "Gold V";
    case "12":
      return "Gold IV";
    case "13":
      return "Gold III";
    case "14":
      return "Gold II";
    case "15":
      return "Gold I";
    case "16":
      return "Platinum V";
    case "17":
      return "Platinum IV";
    case "18":
      return "Platinum III";
    case "19":
      return "Platinum II";
    case "20":
      return "Platinum I";
    case "21":
      return "Diamond V";
    case "22":
      return "Diamond IV";
    case "23":
      return "Diamond III";
    case "24":
      return "Diamond II";
    case "25":
      return "Diamond I";
    case "26":
      return "Master";
    case "27":
      return "Grandmaster";
    default:
      return "Bronze III";
  }
};
