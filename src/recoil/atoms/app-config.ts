import { atom } from "recoil";

interface AppConfig {
  isMinimized: boolean;
  overlayMenuTab: number;
  position: string;
}

export const appConfigState = atom<AppConfig>({
  key: "AppConfig",
  default: {
    isMinimized: true,
    overlayMenuTab: 1,
    position: "left"
  }
});
