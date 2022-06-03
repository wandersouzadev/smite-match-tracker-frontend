import { TwitchHelper } from "./twitch";

// eslint-disable-next-line
export { };
declare global {
  // eslint-disable-next-line
  interface Window {
    Twitch: TwitchHelper;
  }
}
