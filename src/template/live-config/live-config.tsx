import { OverlayPosition } from "@/components/overlay-position";
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
      <h2>Accounts</h2>
      <SmiteAccounts />
      <h2>Position</h2>
      <OverlayPosition />
    </div>
  );
};
