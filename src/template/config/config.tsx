import { ReactComponent as GithubIcon } from "@/assets/github-logo.svg";
import { SmiteAccounts } from "@/components/smite-accounts";
import { SmiteFormAccountConfirmation } from "@/components/smite-form/account-confirmation";
import { SmiteFormAccountSearch } from "@/components/smite-form/account-search";
import { SmiteFormPlatformSelect } from "@/components/smite-form/platform-select";
import { TwitchProfile } from "@/components/twitch-profile";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { smiteFormDataState } from "@/recoil/atoms/smite-form-data";
import { ArrowClockwise, TwitterLogo } from "phosphor-react";
import React, { useCallback } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Styles from "./styles.module.scss";

export const ConfigTemplate: React.FC = () => {
  useTwitchAuth();
  const { step } = useRecoilValue(smiteFormDataState);
  const resetSmiteFormData = useResetRecoilState(smiteFormDataState);

  const refreshState = () => {
    resetSmiteFormData();
  };

  const SmiteFormRender = useCallback(() => {
    switch (step) {
      case 1:
        return <SmiteFormAccountSearch />;
      case 2:
        return <SmiteFormAccountConfirmation />;
      default:
        return <SmiteFormPlatformSelect />;
    }
  }, [step]);

  return (
    <div className={Styles["config-wrapper"]}>
      <aside className={Styles.aside}>
        <div className={Styles["smite-accounts"]}>
          <h2>My Accounts</h2>
          <SmiteAccounts />
        </div>
        <div className={Styles["twitch-profile"]}>
          <TwitchProfile />
        </div>
      </aside>
      <main className={Styles.main}>
        <h1>Smite Match Tracker</h1>
        <SmiteFormRender />
      </main>
      <footer className={Styles.footer}>
        <b>Smite Match Tracker v0.1.0</b>
        <a
          href="https://twitter.com/wandersouzadev"
          target="__blank"
          rel="noreferrer"
        >
          <TwitterLogo size={22} />
        </a>
        <a
          href="https://github.com/wandersouzadev"
          target="__blank"
          rel="noreferrer"
        >
          <GithubIcon style={{ width: 22, height: 22 }} />
        </a>
      </footer>

      <div className={Styles.reload}>
        <button type="button" onClick={refreshState}>
          <ArrowClockwise weight="fill" />
        </button>
      </div>
    </div>
  );
};
