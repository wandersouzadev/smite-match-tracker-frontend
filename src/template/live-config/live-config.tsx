import { AccountList } from "@/components/account-list";
import { TwitchAccount } from "@/components/twitch-account";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import React from "react";
import Styles from "./styles.module.scss";

export const LiveConfigTemplate: React.FC = () => {
  useTwitchAuth();
  return (
    <div className={Styles.wrapper}>
      <TwitchAccount />
      <AccountList />
    </div>
  );
};
