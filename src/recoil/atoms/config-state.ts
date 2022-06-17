import { atom } from "recoil";

interface AppState {
  isMinimized?: boolean;
  overlayTab?: number;
}

export const appConfigState = atom<AppState>({
  key: "ConfigState",
  default: {
    isMinimized: true,
    overlayTab: 1
  }
});
