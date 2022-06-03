import { useEbs } from "@/hooks/use-ebs";
import { ConfigFormState } from "@/recoil/atoms/config-form-state";
import { smiteAccountState } from "@/recoil/atoms/smite-context-account";
import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { Check, X } from "phosphor-react";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FormError } from "./error";
import * as S from "./styles";

interface Props {
  smiteSearchAccount: string | undefined;
  setSmiteSearchAccount: (state: string) => void;
}

export const Confirmation: React.FC<Props> = ({
  smiteSearchAccount,
  setSmiteSearchAccount
}) => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const twitchAuthData = useRecoilValue(twitchAuthDataState);
  const [smiteAccounts, setSmiteAccount] = useRecoilState(smiteAccountState);
  const setFormState = useSetRecoilState(ConfigFormState);

  const { data, isLoading, isError } = useEbs({
    path: `/smite/player?account_name=${smiteSearchAccount}`,
    token: twitchAuthData?.token
  });

  const handleDiscardAccount = () => {
    setSmiteSearchAccount("");
    setFormState(false);
  };

  const handleSaveAccount = () => {
    if (!data) {
      return;
    }
    const contextAccount = {
      Id: data.Id as string,
      Platform: data.Platform as string,
      hz_player_name: data.hz_player_name as string
    };
    const accounts = Object.assign([], smiteAccounts);

    accounts.push(contextAccount);
    setSmiteAccount(accounts);

    twitchHelper?.configuration.set(
      "broadcaster",
      "smite_accounts",
      JSON.stringify(accounts)
    );
    setFormState(false);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <FormError />;
  }

  return (
    <S.ConfirmationWrapper>
      <S.InputWrapper>
        <S.LabelDisabled htmlFor="account-name">Name</S.LabelDisabled>
        <S.InputDisabled
          id="account-name"
          type="text"
          disabled
          value={data.hz_player_name}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.LabelDisabled htmlFor="account-cla">Team</S.LabelDisabled>
        <S.InputDisabled
          id="account-cla"
          type="text"
          disabled
          value={data.Team_Name}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.LabelDisabled htmlFor="account-message">
          Status Message
        </S.LabelDisabled>
        <S.InputDisabled
          id="account-message"
          type="text"
          disabled
          value={data.Personal_Status_Message}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.LabelDisabled htmlFor="account-platform">Platform</S.LabelDisabled>
        <S.InputDisabled
          id="account-platform"
          type="text"
          disabled
          value={data.Platform}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.LabelDisabled htmlFor="account-region">Region</S.LabelDisabled>
        <S.InputDisabled
          id="account-region"
          type="text"
          disabled
          value={data.Region}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.LabelDisabled htmlFor="login-date">Last Login</S.LabelDisabled>
        <S.InputDisabled
          id="login-date"
          type="text"
          disabled
          value={data.Last_Login_Datetime}
        />
      </S.InputWrapper>

      <S.ActionsWrapper>
        <S.ActionsButton disable onClick={handleDiscardAccount}>
          <X />
        </S.ActionsButton>
        <S.ActionsButton onClick={handleSaveAccount}>
          <Check />
        </S.ActionsButton>
      </S.ActionsWrapper>
    </S.ConfirmationWrapper>
  );
};
