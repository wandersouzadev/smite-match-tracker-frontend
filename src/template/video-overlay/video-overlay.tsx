import { SmiteOverlay } from "@/components/smite-overlay";
import { appConfigState } from "@/recoil/atoms/config-state";
import React from "react";
import { useRecoilState } from "recoil";
import Styles from "./styles.module.scss";

export const OverlayTemplate: React.FC = () => {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);

  return (
    <div className={Styles.wrapper}>
      {appConfig.isMinimized ? (
        <div
          className={Styles["minimized-overlay"]}
          onClick={() => setAppConfig({ isMinimized: false })}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <img
            src="overlay-logo.png"
            alt="logo"
            className={Styles["overlay-icon"]}
          />
          <strong>MATCH TRACKER</strong>
        </div>
      ) : (
        <SmiteOverlay />
      )}
    </div>
  );
};
