import { useEbs } from "@/hooks/use-ebs";
import { smiteFormState } from "@/recoil/atoms/smite-form";
import { twitchAuthState } from "@/recoil/atoms/twitch-auth";
import { broadcasterSegmentState } from "@/recoil/atoms/twitch-broadcaster-segment";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { SmitePlayer } from "@/typings/smite/player";
import { ArrowClockwise, Check, X } from "phosphor-react";
import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { SpinnerCircular } from "spinners-react";
import { SmiteFormError } from "../form-error";
import Styles from "./styles.module.scss";

export const SmiteFormAccountConfirmation: React.FC = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const twitchAuth = useRecoilValue(twitchAuthState);
  const [broadcasterSegment, setBroadcasterSegment] = useRecoilState(
    broadcasterSegmentState
  );
  const smiteFormData = useRecoilValue(smiteFormState);
  const resetSmiteFormData = useResetRecoilState(smiteFormState);

  const { data, isLoading, isError } = useEbs<SmitePlayer>({
    path: `/smite/player?account_name=${smiteFormData.nameOrId}${
      smiteFormData.platform ? `&portal_id=${smiteFormData.platform}` : ""
    }`,
    token: twitchAuth?.token
  });

  const handleDiscardAccount = () => {
    resetSmiteFormData();
  };

  const handleSaveAccount = () => {
    if (!data) {
      return;
    }
    const contextAccount = {
      Id: data.Id,
      Platform: data.Platform,
      hz_player_name: data.hz_player_name,
      hz_gamer_tag: data.hz_gamer_tag
    };
    const smiteAccounts = Object.assign([], broadcasterSegment);

    smiteAccounts?.push(contextAccount);

    setBroadcasterSegment(smiteAccounts);

    twitchHelper?.configuration.set(
      "broadcaster",
      process.env.BROADCASTER_SEGMENT_VERSION!,
      JSON.stringify(smiteAccounts)
    );
    resetSmiteFormData();
  };

  if (data?.ret_msg?.includes("Player Privacy")) {
    return (
      <div className={Styles["private-profile"]}>
        <p>
          Error <strong>{smiteFormData.nameOrId}</strong> profile is private.
        </p>
        <button type="button">
          <ArrowClockwise
            size={32}
            cursor="pointer"
            onClick={resetSmiteFormData}
          />
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={Styles.loading}>
        <SpinnerCircular color="hsl(250, 51.8%, 51.2%)" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center" }}>
        <SmiteFormError />
      </div>
    );
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
            value={data.hz_gamer_tag || data.hz_player_name}
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
