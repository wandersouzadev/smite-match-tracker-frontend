import { ReactComponent as GithubIcon } from "@/assets/github-logo.svg";
import { OverlayPosition } from "@/components/overlay-position";
import { SmiteAccounts } from "@/components/smite-accounts";
import { SmiteFormAccountConfirmation } from "@/components/smite-form/account-confirmation";
import { SmiteFormAccountSearch } from "@/components/smite-form/account-search";
import { SmiteFormPlatformSelect } from "@/components/smite-form/platform-select";
import { TwitchProfile } from "@/components/twitch-profile";
import { smiteFormState } from "@/recoil/atoms/smite-form";
import { ArrowClockwise, TwitterLogo } from "phosphor-react";
import React from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Styles from "./config.module.scss";

export const ConfigTemplate: React.FC = () => {
  const { step } = useRecoilValue(smiteFormState);
  const resetSmiteFormData = useResetRecoilState(smiteFormState);

  const refreshState = () => {
    resetSmiteFormData();
  };

  return (
    <div className={Styles.wrapper}>
      <aside className={Styles.aside}>
        <div className={Styles.content}>
          <h2>Accounts</h2>
          <SmiteAccounts />
        </div>
        <div className={Styles.content}>
          <h2>Position</h2>
          <OverlayPosition />
        </div>
        <div className={Styles.content}>
          <TwitchProfile />
        </div>
      </aside>
      <main className={Styles.main}>
        <h1>Smite Match Tracker</h1>
        {step === 0 && <SmiteFormPlatformSelect />}
        {step === 1 && <SmiteFormAccountSearch />}
        {step === 2 && <SmiteFormAccountConfirmation />}
      </main>
      <footer className={Styles.footer}>
        <b>Smite Match Tracker v1.4.0</b>
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
