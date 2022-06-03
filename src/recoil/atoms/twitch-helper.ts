import { atom } from "recoil";

export const twitchHelperState = atom({
  key: "TwitchHelper",
  default: window.Twitch ? window.window.Twitch.ext : null
});
