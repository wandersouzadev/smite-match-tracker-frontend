import { useEbs } from "@/hooks/use-ebs";
import { smiteAccountState } from "@/recoil/atoms/smite-context-account";
import { smiteFormDataState } from "@/recoil/atoms/smite-form-data";
import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { Check, X } from "phosphor-react";
import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { SmiteFormError } from "../form-error";
import Styles from "./styles.module.scss";

export const SmiteFormAccountConfirmation: React.FC = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const twitchAuthData = useRecoilValue(twitchAuthDataState);
  const [smiteAccount, setSmiteAccount] = useRecoilState(smiteAccountState);
  const smiteFormData = useRecoilValue(smiteFormDataState);
  const resetSmiteFormData = useResetRecoilState(smiteFormDataState);

  const { data, isLoading, isError } = useEbs({
    path: `/smite/player?account_name=${smiteFormData.nameOrId}${
      smiteFormData.platform ? `&portal_id=${smiteFormData.platform}` : ""
    }`,
    token: twitchAuthData?.token
  });

  const handleDiscardAccount = () => {
    resetSmiteFormData();
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
    const accounts = Object.assign([], smiteAccount);

    accounts.push(contextAccount);
    setSmiteAccount(accounts);

    twitchHelper?.configuration.set(
      "broadcaster",
      "smite_accounts",
      JSON.stringify(accounts)
    );
    resetSmiteFormData();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <SmiteFormError />;
  }

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.control}>
        <label htmlFor="account-name">
          Name
          <input
            id="account-name"
            type="text"
            disabled
            value={data.hz_player_name || data.hz_gamer_tag}
          />
        </label>
      </div>

      <div className={Styles.control}>
        <label htmlFor="account-team">
          Team
          <input
            id="account-team"
            type="text"
            disabled
            value={data.Team_Name}
          />
        </label>
      </div>

      <div className={Styles.control}>
        <label htmlFor="account-message">
          Status Message
          <input
            id="account-message"
            type="text"
            disabled
            value={data.Personal_Status_Message}
          />
        </label>
      </div>

      <div className={Styles.control}>
        <label htmlFor="account-platform">
          Platform
          <input
            id="account-platform"
            type="text"
            disabled
            value={data.Platform}
          />
        </label>
      </div>

      <div className={Styles.control}>
        <label htmlFor="account-region">
          Region
          <input id="account-region" type="text" disabled value={data.Region} />
        </label>
      </div>

      <div className={Styles.control}>
        <label htmlFor="login-date">
          Last Login
          <input
            id="login-date"
            type="text"
            disabled
            value={data.Last_Login_Datetime}
          />
        </label>
      </div>

      <div className={Styles.actions}>
        <button
          className={Styles.close}
          type="button"
          onClick={handleDiscardAccount}
        >
          <X size={32} weight="fill" />
        </button>
        <button
          className={Styles.confirm}
          type="button"
          onClick={handleSaveAccount}
        >
          <Check size={32} weight="fill" />
        </button>
      </div>
    </div>
  );
};
