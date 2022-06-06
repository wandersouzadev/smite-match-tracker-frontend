import { SmiteAccounts } from "@/components/smite-accounts";
import { SmiteSearchConfirmation } from "@/components/smite-search-confirmation";
import { TwitchProfile } from "@/components/twitch-profile";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { GithubLogo, TwitterLogo } from "phosphor-react";
import React from "react";
import Styles from "./styles.module.scss";

export const ConfigTemplate: React.FC = () => {
  useTwitchAuth();

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
        <img src="logo.png" alt="logo" width={400} height={100} />
        <SmiteSearchConfirmation />
      </main>
      <footer className={Styles.footer}>
        <b>Smite Match Tracker v0.1.0</b>
        <a
          href="https://twitter.com/wandersouzadev"
          target="__blank"
          rel="noreferrer"
        >
          <TwitterLogo size={32} />
        </a>
        <a
          href="https://github.com/wandersouzadev"
          target="__blank"
          rel="noreferrer"
        >
          <GithubLogo size={32} />
        </a>
      </footer>
    </div>
  );
};
