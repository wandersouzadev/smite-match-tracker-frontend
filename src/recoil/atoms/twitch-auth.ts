import { atom } from "recoil";

export const twitchAuthState = atom({
  key: "TwitchAuth",
  default: null as unknown as Twitch.ext.Authorized
});
