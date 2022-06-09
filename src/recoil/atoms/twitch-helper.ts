import { atom } from "recoil";

export const twitchHelperState = atom({
  key: "TwitchHelper",
  default: window.Twitch ? window.Twitch.ext : null
});
