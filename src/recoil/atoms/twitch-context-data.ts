import { atom } from "recoil";

export const twitchContextState = atom({
  key: "TwitchContext",
  default: null as unknown as Partial<Twitch.ext.Context>
});
