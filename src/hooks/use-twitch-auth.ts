import { twitchAuthState } from "@/recoil/atoms/twitch-auth";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useTwitchAuth = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const [twitchAuth, setTwitchAuth] = useRecoilState(twitchAuthState);
  useEffect(() => {
    twitchHelper?.onAuthorized((auth) => {
      setTwitchAuth(auth);
    });
  }, [twitchHelper, setTwitchAuth]);
  return twitchAuth;
};
