import { SmiteAccounts } from "@/components/smite-accounts";
import { TwitchProfile } from "@/components/twitch-profile";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import React from "react";
import Styles from "./live-config.module.scss";

export const LiveConfigTemplate: React.FC = () => {
  useTwitchAuth();
  return (
    <div className={Styles.wrapper}>
      <TwitchProfile />
      <SmiteAccounts />
    </div>
  );
};
