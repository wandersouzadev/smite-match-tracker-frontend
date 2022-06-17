import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { TwitchUser } from "@/typings/twitch/user";
import React from "react";
import Styles from "./styles.module.scss";

export const TwitchProfile: React.FC = () => {
  const twitchAuth = useTwitchAuth();

  const { data, isLoading, isError } = useEbs<TwitchUser>({
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
