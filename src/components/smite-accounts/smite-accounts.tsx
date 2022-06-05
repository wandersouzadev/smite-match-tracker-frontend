import { ReactComponent as CheckIcon2 } from "@/assets/check2-icon.svg";
import { ReactComponent as TrashIcon } from "@/assets/trash-icon.svg";
import { BrandLogos } from "@/components/brand-logos";
import { useEbs } from "@/hooks/use-ebs";
import { smiteAccountState } from "@/recoil/atoms/smite-context-account";
import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./styles";

export const SmiteAccounts: React.FC = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const [smiteAccounts, setSmiteAccounts] = useRecoilState(smiteAccountState);
  const twitchAuthData = useRecoilValue(twitchAuthDataState);

  const { data, isLoading, isError } = useEbs({
    path: "/twitch/configuration/segment",
    token: twitchAuthData?.token,
    config: {
      revalidateOnFocus: false
    }
  });

  useEffect(() => {
    if (data) {
      const accounts = JSON.parse(data.content || "[]");
      setSmiteAccounts(accounts);
    }
  }, [data, setSmiteAccounts]);

  const handleChangeMainAccount = (i: number) => {
    if (!twitchHelper || !smiteAccounts) {
      return;
    }

    const filteredAccounts = smiteAccounts.filter(
      (accounts, index) => index !== i
    );

    filteredAccounts.unshift(smiteAccounts[i]);

    twitchHelper.configuration.set(
      "broadcaster",
      "smite_accounts",
      JSON.stringify(filteredAccounts)
    );
    setSmiteAccounts(filteredAccounts);
  };

  const handleRemoveSmiteAccount = (i: number) => {
    if (!twitchHelper) {
      return;
    }
    const filteredAccounts = smiteAccounts?.filter(
      (accounts, index) => index !== i
    );

    if (filteredAccounts && filteredAccounts.length) {
      twitchHelper.configuration.set(
        "broadcaster",
        "smite_accounts",
        JSON.stringify(filteredAccounts)
      );
      setSmiteAccounts(filteredAccounts);
    } else {
      twitchHelper.configuration.set("broadcaster", "smite_accounts", "");
      setSmiteAccounts(null);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>error</h1>;
  }

  return (
    <S.AccountsWrapper>
      <S.Title>MY ACCOUNTS</S.Title>
      <S.Accounts>
        {(smiteAccounts?.length &&
          smiteAccounts?.map((account, accountIndex) => (
            <S.Account key={account.Id}>
              <S.AccountWrapper>
                <S.AccountInfo>
                  <BrandLogos iconName={account.Platform!} />
                  {account.hz_player_name}
                </S.AccountInfo>
                {accountIndex ? (
                  <S.AccountActions>
                    <S.ActionButton
                      onClick={() => handleChangeMainAccount(accountIndex)}
                    >
                      <CheckIcon2 />
                    </S.ActionButton>
                    <S.ActionButton
                      onClick={() => handleRemoveSmiteAccount(accountIndex)}
                    >
                      <TrashIcon />
                    </S.ActionButton>
                  </S.AccountActions>
                ) : null}
              </S.AccountWrapper>
            </S.Account>
          ))) || <strong>no accounts</strong>}
      </S.Accounts>
    </S.AccountsWrapper>
  );
};
