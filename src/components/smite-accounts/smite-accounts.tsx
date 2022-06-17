import { PlatformIcon } from "@/components/platform-icon";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { smiteAccountState } from "@/recoil/atoms/smite-context-account";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { ArrowUp, Trash } from "phosphor-react";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Styles from "./styles.module.scss";

export const SmiteAccounts: React.FC = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const [smiteAccounts, setSmiteAccounts] = useRecoilState(smiteAccountState);
  const twitchAuthData = useTwitchAuth();

  const { data, isLoading, isError } = useEbs<{ content: string | null }>({
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

  const handleChangeMainAccount = (accountIndex: number) => {
    if (!twitchHelper || !smiteAccounts) {
      return;
    }

    const filteredAccounts = smiteAccounts.filter(
      (accounts, index) => index !== accountIndex
    );

    filteredAccounts.unshift(smiteAccounts[accountIndex]);

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
    return <h1>Error</h1>;
  }

  return (
    <div className={Styles.wrapper}>
      <ul className={Styles["account-list"]}>
        {(smiteAccounts?.length &&
          smiteAccounts?.map((account, accountIndex) => (
            <li className={Styles.account} key={account.Id}>
              <div className={Styles["account-wrapper"]}>
                <PlatformIcon platformName={account.Platform!} />
                <p>{account.hz_player_name}</p>

                <div className={Styles["account-actions"]}>
                  <button
                    disabled={!accountIndex}
                    style={accountIndex ? {} : { color: "transparent" }}
                    type="button"
                    onClick={() => handleChangeMainAccount(accountIndex)}
                  >
                    <ArrowUp size={24} weight="fill" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveSmiteAccount(accountIndex)}
                  >
                    <Trash size={24} weight="fill" />
                  </button>
                </div>
              </div>
            </li>
          ))) || <template />}
      </ul>
    </div>
  );
};
