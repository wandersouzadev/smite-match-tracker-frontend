import { SmiteAccounts } from "@/components/smite-accounts";
import { TwitchAccount } from "@/components/twitch-account";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import React from "react";
import Styles from "./styles.module.scss";

export const LiveConfigTemplate: React.FC = () => {
  useTwitchAuth();
  return (
    <div className={Styles.wrapper}>
      <TwitchAccount />
      <SmiteAccounts />
    </div>
  );
};
