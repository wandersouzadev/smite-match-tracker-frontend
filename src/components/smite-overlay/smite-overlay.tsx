import { appConfigState } from "@/recoil/atoms/app-config";
import cx from "classnames";
import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import { MatchHistory } from "../match-history";
import { MatchTracker } from "../match-tracker";
import { ProfileTracker } from "../profile-tracker";
import { Stats } from "../stats";
import Styles from "./smite-overlay.module.scss";

export const SmiteOverlay: React.FC = () => {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);
  const OverlayTabComponent = useMemo(() => {
    switch (appConfig.overlayMenuTab) {
      case 1:
        return <MatchTracker />;
      case 2:
        return <ProfileTracker />;
      case 3:
        return <Stats />;
      case 4:
        return <MatchHistory />;
      default:
        return <MatchTracker />;
    }
  }, [appConfig.overlayMenuTab]);
  return (
    <div className={cx(Styles.wrapper)}>
      <header className={Styles.header}>
        <img
          className={Styles.logo}
          src="overlay-logo.png"
          alt="overlay logo"
        />
        <button
          type="button"
          className={appConfig?.overlayMenuTab === 1 ? Styles.active : null}
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, overlayMenuTab: 1 }))
          }
        >
          Match
        </button>
        <button
          type="button"
          className={appConfig?.overlayMenuTab === 2 ? Styles.active : null}
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, overlayMenuTab: 2 }))
          }
        >
          Profile
        </button>
        <button
          type="button"
          className={cx(appConfig?.overlayMenuTab === 3 ? Styles.active : null)}
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, overlayMenuTab: 3 }))
          }
        >
          Stats
        </button>

        <button
          type="button"
          className={cx(appConfig?.overlayMenuTab === 4 ? Styles.active : null)}
          onClick={() =>
            setAppConfig((oldValue) => ({ ...oldValue, overlayMenuTab: 4 }))
          }
        >
          Match History
        </button>
      </header>
      <main className={Styles.main}>{OverlayTabComponent}</main>
    </div>
  );
};
