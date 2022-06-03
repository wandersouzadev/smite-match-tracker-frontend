import { ReactComponent as EpicLogoSvg } from "@/assets/epic-logo.svg";
import { ReactComponent as HirezLogoSvg } from "@/assets/hirez-logo.svg";
import { ReactComponent as SteamLogoSvg } from "@/assets/steam-logo.svg";
import React from "react";

interface Props {
  iconName: string;
}

export const BrandLogos: React.FC<Props> = ({ iconName }) => {
  switch (iconName) {
    case "Steam":
      return <SteamLogoSvg width={20} />;
    case "Epic Games":
      return <EpicLogoSvg width={20} />;
    default:
      return <HirezLogoSvg width={20} />;
  }
};
