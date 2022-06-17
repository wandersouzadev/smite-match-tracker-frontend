import { twitchContextState } from "@/recoil/atoms/twitch-context-data";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useTwitchContext = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const [twitchContext, setTwitchContext] = useRecoilState(twitchContextState);

  useEffect(() => {
    twitchHelper?.onContext((context) => {
      setTwitchContext(context);
    });
  }, [twitchHelper, setTwitchContext]);
  return twitchContext;
};
