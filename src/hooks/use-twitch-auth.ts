import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useTwitchAuth = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const setTwitchAuth = useSetRecoilState(twitchAuthDataState);

  useEffect(() => {
    twitchHelper?.onAuthorized((auth) => {
      setTwitchAuth(auth);
    });
  }, [twitchHelper, setTwitchAuth]);
};
