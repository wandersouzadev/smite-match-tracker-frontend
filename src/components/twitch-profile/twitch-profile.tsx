import { useEbs } from "@/hooks/use-ebs";
import { twitchAuthState } from "@/recoil/atoms/twitch-auth";
import { TwitchUser } from "@/typings/twitch/user";
import React from "react";
import { useRecoilValue } from "recoil";
import { SpinnerCircular } from "spinners-react";
import { Error } from "../shared/error";
import { Loading } from "../shared/loading";
import Styles from "./styles.module.scss";

export const TwitchProfile: React.FC = () => {
  const twitchAuth = useRecoilValue(twitchAuthState);

  const { data, isLoading, isError } = useEbs<TwitchUser>({
    path: `/twitch/search/user?id=${twitchAuth?.channelId}`,
    token: twitchAuth?.token
  });

  if (isLoading) {
    return (
      <Loading>
        <SpinnerCircular color="#443592" />
      </Loading>
    );
  }

  if (isError) {
    return <Error />;
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
