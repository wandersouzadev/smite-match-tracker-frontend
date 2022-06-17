import { appConfigState } from "@/recoil/atoms/config-state";
import { X } from "phosphor-react";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { MatchTracker } from "../match-tracker";
import { ProfileTracker } from "../profile-tracker";
import Styles from "./styles.module.scss";

export const SmiteOverlay: React.FC = () => {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);

  const OverlayContent = useCallback(() => {
    if (appConfig.overlayTab === 2) {
      return <ProfileTracker />;
    }
    return <MatchTracker />;
  }, [appConfig]);
  return (
    <div className={Styles.wrapper}>
      <button
        type="button"
        className={Styles.close}
        onClick={() => setAppConfig({ isMinimized: true })}
      >
        <X size={22} weight="fill" />
      </button>
      <header className={Styles.header}>
        <button
          type="button"
          className={appConfig?.overlayTab === 1 ? Styles.active : null}
          onClick={() => setAppConfig({ overlayTab: 1 })}
        >
          Match Tracker
        </button>
        <img
          className={Styles.logo}
          src="overlay-logo.png"
          alt="overlay logo"
        />
        <button
          type="button"
          className={appConfig?.overlayTab === 2 ? Styles.active : null}
          onClick={() => setAppConfig({ overlayTab: 2 })}
        >
          Profile Tracker
        </button>
      </header>
      <main className={Styles.main}>
        <OverlayContent />
      </main>
    </div>
  );
};
