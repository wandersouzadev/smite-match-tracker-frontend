import { atom } from "recoil";

export const twitchAuthState = atom({
  key: "TwitchAuthData",
  default: null as unknown as Twitch.ext.Authorized
});
