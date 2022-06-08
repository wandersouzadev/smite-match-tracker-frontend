import { ReactComponent as EpicLogoSvg } from "@/assets/epic-logo.svg";
import { ReactComponent as HirezLogoSvg } from "@/assets/hirez-logo.svg";
import { ReactComponent as NintendoSwitchLogoSvg } from "@/assets/nintendo-switch-logo.svg";
import { ReactComponent as PClogoSvg } from "@/assets/pc-logo.svg";
import { ReactComponent as PlaystationLogoSvg } from "@/assets/playstation-logo.svg";
import { ReactComponent as SteamLogoSvg } from "@/assets/steam-logo.svg";
import { ReactComponent as XboxLogoSvg } from "@/assets/xbox-logo.svg";
import React from "react";

interface Props {
  platformName: string;
  width?: number;
  height?: number;
}

export const PlatformIcon: React.FC<Props> = ({
  platformName,
  width = 24,
  height = 24
}) => {
  switch (platformName) {
    case "PC":
      return <PClogoSvg width={width} height={height} />;
    case "Steam":
      return <SteamLogoSvg width={width} height={height} />;
    case "Epic Games":
      return <EpicLogoSvg width={width} height={height} />;
    case "Nintendo Switch":
      return <NintendoSwitchLogoSvg width={width} height={height} />;
    case "PSN":
      return <PlaystationLogoSvg width={width} height={height} />;
    case "XboxLive":
      return <XboxLogoSvg width={width} height={height} />;
    default:
      return <HirezLogoSvg width={width} height={height} />;
  }
};
