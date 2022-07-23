import { PlatformIcon } from "@/components/platform-icon";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { broadcasterSegmentState } from "@/recoil/atoms/twitch-broadcaster-segment";
import { twitchHelperState } from "@/recoil/atoms/twitch-helper";
import { SmitePlayer } from "@/typings/smite/player";
import { ArrowUp, Trash } from "phosphor-react";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SpinnerCircular } from "spinners-react";
import { Error } from "../common/error";
import Styles from "./styles.module.scss";

export const SmiteAccounts: React.FC = () => {
  const twitchHelper = useRecoilValue(twitchHelperState);
  const twitchAuth = useTwitchAuth();
  const [broadcasterSegment, setBroadcasterSegment] = useRecoilState(
    broadcasterSegmentState
  );

  const { data, isLoading, isError } = useEbs<{ content: string | null }>({
    path: "/twitch/configuration/segment",
    token: twitchAuth?.token
  });

  useEffect(() => {
    const parsedBroadcasterSegment: Partial<SmitePlayer>[] = JSON.parse(
      data?.content || "{}"
    );
    setBroadcasterSegment(parsedBroadcasterSegment);
  }, [data, setBroadcasterSegment]);

  const handleChangeMainAccount = (accountIndex: number) => {
    if (!twitchHelper || !broadcasterSegment) {
      return;
    }

    // all saved smite accounts without the selected
    const filteredAccounts = broadcasterSegment?.filter(
      (accounts, index) => index !== accountIndex
    );

    // re insert the selected account at start
    filteredAccounts.unshift(broadcasterSegment[accountIndex]);

    twitchHelper.configuration.set(
      "broadcaster",
      process.env.BROADCASTER_SEGMENT_VERSION!,
      JSON.stringify(filteredAccounts)
    );
    setBroadcasterSegment(filteredAccounts);
  };

  const handleRemoveSmiteAccount = (i: number) => {
    if (!twitchHelper) {
      return;
    }
    const filteredAccounts = broadcasterSegment?.filter(
      (accounts, index) => index !== i
    );

    if (filteredAccounts && filteredAccounts.length) {
      twitchHelper.configuration.set(
        "broadcaster",
        process.env.BROADCASTER_SEGMENT_VERSION!,
        JSON.stringify(filteredAccounts)
      );
      setBroadcasterSegment(filteredAccounts);
    } else {
      twitchHelper.configuration.set(
        "broadcaster",
        process.env.BROADCASTER_SEGMENT_VERSION!,
        ""
      );
      setBroadcasterSegment([]);
    }
  };

  if (isLoading) {
    return (
      <div className={Styles.loading}>
        <SpinnerCircular color="hsl(250, 46.8%, 38.9%)" />
      </div>
    );
  }

  if (isError) {
    return <Error />;
  }

  if (!broadcasterSegment?.length) {
    return (
      <div className={Styles["account-empty"]}>
        <p>No account found</p>
        <span>add one or more SMITE accounts to start using the extension</span>
      </div>
    );
  }

  return (
    <div className={Styles.wrapper}>
      <ul className={Styles["account-list"]}>
        {(broadcasterSegment?.length &&
          broadcasterSegment?.map((account, accountIndex) => (
            <li className={Styles.account} key={account.Id}>
              <div className={Styles["account-wrapper"]}>
                <PlatformIcon platformName={account.Platform!} />
                <p>{account.hz_player_name || account.hz_gamer_tag}</p>

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
