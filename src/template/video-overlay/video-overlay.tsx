import { SmiteOverlay } from "@/components/smite-overlay";
import { SmiteOverlayMinimized } from "@/components/smite-overlay-minimized/smite-overlay-minimized";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { useTwitchContext } from "@/hooks/use-twitch-context";
import { appConfigState } from "@/recoil/atoms/app-config";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Styles from "./video-overlay.module.scss";

export const OverlayTemplate: React.FC = () => {
  const twitchAuth = useTwitchAuth();
  const twitchContext = useTwitchContext();
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);

  const { data } = useEbs<{ position: any | null }>({
    path: "/twitch/configuration/settings",
    token: twitchContext?.game === "SMITE" ? twitchAuth?.token : undefined
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setAppConfig((oldValue) => {
      return {
        ...oldValue,
        position: data.position
      };
    });
  }, [data, setAppConfig]);

  if (twitchContext?.game !== "SMITE") {
    return <template />;
  }

  return (
    <div className={Styles.wrapper}>
      {appConfig?.isMinimized ? <SmiteOverlayMinimized /> : <SmiteOverlay />}
    </div>
  );
};
