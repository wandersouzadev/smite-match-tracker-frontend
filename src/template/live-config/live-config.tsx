import { AccountList } from "@/components/account-list";
import { useTwitchHelper } from "@/hooks/use-twitch-helper";
import React from "react";
import * as S from "./styles";

export const LiveConfigTemplate: React.FC = () => {
  useTwitchHelper();
  return (
    <S.LiveConfigWrapper>
      <AccountList />
    </S.LiveConfigWrapper>
  );
};
