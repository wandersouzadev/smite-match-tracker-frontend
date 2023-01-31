import { useTwitchContext } from "@/hooks/use-twitch-context";
import { appConfigState } from "@/recoil/atoms/app-config";
import cx from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import Styles from "./smite-overlay-minimized.module.scss";

export const SmiteOverlayMinimized: React.FC = () => {
  const twitchContext = useTwitchContext();
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);

  return (
    <div
      className={cx(
        Styles.wrapper,
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
  );
};
