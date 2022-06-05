// eslint-disable-next-line
export { };
declare global {
  interface Window {
    Twitch: {
      ext: {
        onAuthorized: (
          callback: (auth: {
            channelId: string;
            clientId: string;
            token: string;
            helixToken: string;
            userId: string;
          }) => void
        ) => void;
        actions: {
          followChannel: (channelName: String) => void;
          minimize: () => void;
          onFollow: (
            callback: (didFollow: boolean, channelName: string) => void
          ) => void;
          requestIdShare: () => void;
        };
        configuration: {
          broadcaster: { version: string; content: string } | undefined;
          developer: { version: string; content: string } | undefined;
          global: { version: string; content: string } | undefined;
          set: (segment: string, version: string, content: string) => void;
          onChanged: (callback: () => void) => void;
        };
        features: {};
        bits: {};
        onContext: (
          contextCallback: (context: {
            arePlayerControlsVisible: boolean;
            bitrate: number;
            bufferSize: number;
            displayResolution: string;
            game: string;
            hlsLatencyBroadcaster: number;
            hostingInfo: { hostedChannelId: number; hostingChannelId: number };
            isFullScreen: boolean;
            isMuted: boolean;
            isPaused: boolean;
            isTheatreMode: boolean;
            language: string;
            mode: "viewer" | "dashboard" | "config";
            playbackMode: "video" | "audio" | "remote" | "chat-only";
            theme: "light" | "dark";
            videoResolution: string;
            volume: 0 | 1;
          }) => void
        ) => void;
        onError: (errorCallback: () => void) => void;
      };
    };
  }
}
