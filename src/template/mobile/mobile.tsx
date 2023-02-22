import { ReactComponent as CaretLeft } from "@/assets/caret-left.svg";
import { ReactComponent as CaretRight } from "@/assets/caret-right.svg";
import { MobileMatchHistory } from "@/components/mobile-match-history";
import { MobileMatchTracker } from "@/components/mobile-match-tracker";
import { MobileProfileTracker } from "@/components/mobile-profile-tracker/mobile-profile-tracker";
import { appConfigState } from "@/recoil/atoms/app-config";
import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import Styles from "./mobile.module.scss";

export const MobileTemplate: React.FC = () => {
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);
  const OverlayTabComponent = useMemo(() => {
    switch (appConfig.overlayMenuTab) {
      case 1:
        return <MobileProfileTracker />;
      case 2:
        return <MobileMatchHistory />;
      case 3:
        return <MobileMatchTracker />;
      default:
        return <MobileProfileTracker />;
    }
  }, [appConfig.overlayMenuTab]);

  const handleHeaderButtonToLeftClick = () => {
    setAppConfig((prev) => {
      return {
        ...prev,
        overlayMenuTab: prev.overlayMenuTab === 1 ? 3 : prev.overlayMenuTab - 1
      };
    });
  };

  const handleHeaderButtonToRightClick = () => {
    setAppConfig((prev) => {
      return {
        ...prev,
        overlayMenuTab: prev.overlayMenuTab === 3 ? 1 : prev.overlayMenuTab + 1
      };
    });
  };

  const TabTitle = useMemo(() => {
    switch (appConfig.overlayMenuTab) {
      case 1:
        return "Profile";
      case 2:
        return "Match History";
      case 3:
        return "Live Match";
      default:
        return "Profile";
    }
  }, [appConfig.overlayMenuTab]);

  return (
    <div className={Styles.wrapper}>
      <header className={Styles.header}>
        <button type="button" onClick={handleHeaderButtonToLeftClick}>
          <CaretLeft />
        </button>
        <div className={Styles.brand}>
          <img className={Styles.logo} src="extension-logo.png" alt="logo" />
          <h2 className={Styles.title}>{TabTitle}</h2>
        </div>
        <button type="button" onClick={handleHeaderButtonToRightClick}>
          <CaretRight />
        </button>
      </header>
      <main className={Styles.main}>{OverlayTabComponent}</main>
    </div>
  );
};
