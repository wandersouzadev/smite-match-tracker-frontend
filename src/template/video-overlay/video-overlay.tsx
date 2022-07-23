import { SmiteOverlay } from "@/components/smite-overlay";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { useTwitchContext } from "@/hooks/use-twitch-context";
import { appConfigState } from "@/recoil/atoms/app-config";
import cx from "classnames";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Styles from "./styles.module.scss";

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
      {appConfig.isMinimized ? (
        <div
          className={cx(
            Styles["minimized-overlay"],
            appConfig?.position ? Styles[appConfig.position] : Styles.left,
            twitchContext?.arePlayerControlsVisible ? Styles.active : undefined
          )}
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, isMinimized: false }))
          }
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <img
            src="overlay-logo.png"
            alt="logo"
            className={Styles["overlay-icon"]}
          />
          <strong
            className={
              twitchContext?.arePlayerControlsVisible ? Styles.show : undefined
            }
          >
            MATCH TRACKER
          </strong>
        </div>
      ) : (
        <SmiteOverlay />
      )}
    </div>
  );
};
