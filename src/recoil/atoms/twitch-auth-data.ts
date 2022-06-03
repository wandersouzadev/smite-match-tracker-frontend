import { atom } from "recoil";

interface TwitchAuthData {
  channelId: string;
  clientId: string;
  token: string;
  helixToken: string;
  userId: string;
}

export const twitchAuthDataState = atom({
  key: "TwitchAuthData",
  default: null as unknown as TwitchAuthData
});
