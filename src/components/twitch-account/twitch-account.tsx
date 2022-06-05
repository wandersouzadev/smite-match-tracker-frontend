import { useEbs } from "@/hooks/use-ebs";
import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import React from "react";
import { useRecoilValue } from "recoil";
import Styles from "./styles.module.scss";

export const TwitchAccount: React.FC = () => {
  const twitchAuth = useRecoilValue(twitchAuthDataState);

  const { data, isLoading, isError } = useEbs({
    path: `/twitch/search/user?id=${twitchAuth?.channelId}`,
    token: twitchAuth?.token
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div className={Styles.wrapper}>
      <img
        className={Styles["profile-image"]}
        src={data.profile_image_url}
        alt="twitch profile"
      />
      <p className={Styles["profile-name"]}>twitch.tv/{data.login}</p>
    </div>
  );
};
