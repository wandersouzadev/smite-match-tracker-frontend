import { SmiteOverlay } from "@/components/smite-overlay";
import { SmiteOverlayMinimized } from "@/components/smite-overlay-minimized/smite-overlay-minimized";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { useTwitchContext } from "@/hooks/use-twitch-context";
import { appConfigState } from "@/recoil/atoms/app-config";
import cx from "classnames";
import { CaretLeft, CaretRight } from "phosphor-react";
import React, { useEffect, useMemo } from "react";
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

  const OpenCloseButtonIconToggle = useMemo(() => {
    if (appConfig.position.includes("left")) {
      return appConfig.isMinimized ? <CaretRight /> : <CaretLeft />;
    }
    return appConfig.isMinimized ? <CaretLeft /> : <CaretRight />;
  }, [appConfig.position, appConfig.isMinimized]);

  if (twitchContext?.game !== "SMITE") {
    return <template />;
  }

  return (
    <div
      className={cx(
        Styles.wrapper,
        appConfig?.position ? Styles[appConfig?.position] : Styles.left,
        appConfig?.isMinimized === false &&
          (appConfig?.position === "left" || appConfig?.position === "right") &&
          Styles["middle-maximized"],
        appConfig?.isMinimized === false &&
          appConfig?.position.includes("left") &&
          Styles["left-maximized"],
        appConfig?.isMinimized === false &&
          appConfig?.position.includes("right") &&
          Styles["right-maximized"],
        appConfig?.position.includes("left") && Styles["left-side"],
        appConfig?.position.includes("right") && Styles["right-side"]
      )}
    >
      {appConfig?.isMinimized ? <SmiteOverlayMinimized /> : <SmiteOverlay />}
      <div className={cx(Styles["open-close-toggle"])}>
        <button
          type="button"
          onClick={() =>
            setAppConfig((oldValue) => ({
              ...oldValue,
              isMinimized: !oldValue.isMinimized
            }))
          }
        >
          {OpenCloseButtonIconToggle}
        </button>
      </div>
    </div>
  );
};
