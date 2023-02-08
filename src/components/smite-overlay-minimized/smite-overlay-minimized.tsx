import { useTwitchContext } from "@/hooks/use-twitch-context";
import { appConfigState } from "@/recoil/atoms/app-config";
import cx from "classnames";
import React from "react";
import { useSetRecoilState } from "recoil";
import Styles from "./smite-overlay-minimized.module.scss";

export const SmiteOverlayMinimized: React.FC = () => {
  const setAppConfig = useSetRecoilState(appConfigState);
  const twitchContext = useTwitchContext();

  return (
    <div
      className={cx(
        Styles.wrapper,
        twitchContext?.arePlayerControlsVisible && Styles["controls-active"]
      )}
      onClick={() =>
        setAppConfig((oldValue) => ({ ...oldValue, isMinimized: false }))
      }
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <div className={Styles.logo}>
        <img src="extension-logo.png" alt="logo" />
      </div>
    </div>
  );
};
