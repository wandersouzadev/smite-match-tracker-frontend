import { appConfigState } from "@/recoil/atoms/app-config";
import cx from "classnames";
import { X } from "phosphor-react";
import React from "react";
import { useRecoilState } from "recoil";
import { MatchTracker } from "../match-tracker";
import { ProfileTracker } from "../profile-tracker";
import Styles from "./styles.module.scss";

export const SmiteOverlay: React.FC = () => {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);

  return (
    <div
      className={cx(Styles.wrapper, Styles[appConfig.position || Styles.left])}
    >
      <button
        type="button"
        className={Styles.close}
        onClick={() =>
          setAppConfig((oldValue) => ({ ...oldValue, isMinimized: true }))
        }
      >
        <X size={22} weight="fill" />
      </button>
      <header className={Styles.header}>
        <button
          type="button"
          className={appConfig?.overlayTab === 1 ? Styles.active : null}
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, overlayTab: 1 }))
          }
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
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, overlayTab: 2 }))
          }
        >
          Profile Tracker
        </button>
      </header>
      <main className={Styles.main}>
        {appConfig.overlayTab === 2 ? <ProfileTracker /> : <MatchTracker />}
      </main>
    </div>
  );
};
