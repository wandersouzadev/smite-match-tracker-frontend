import { AccountList } from "@/components/account-list";
import { SmiteSearchConfirmation } from "@/components/smite-search-confirmation";
import { TwitchAccount } from "@/components/twitch-account";
import { useTwitchHelper } from "@/hooks/use-twitch-helper";
import React from "react";
import * as S from "./styles";

export const ConfigTemplate: React.FC = () => {
  useTwitchHelper();
  return (
    <S.ConfigPageWrapper>
      <S.Aside>
        <div />
        <AccountList />
        <TwitchAccount />
      </S.Aside>
      <S.Main>
        <img src="logo.png" alt="logo" width={400} height={100} />
        <SmiteSearchConfirmation />
      </S.Main>
    </S.ConfigPageWrapper>
  );
};
