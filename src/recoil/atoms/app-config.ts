import { atom } from "recoil";

interface AppConfig {
  isMinimized?: boolean;
  overlayTab?: number;
  position: string;
}

export const appConfigState = atom<AppConfig>({
  key: "AppConfig",
  default: {
    isMinimized: true,
    overlayTab: 1,
    position: "left"
  }
});
