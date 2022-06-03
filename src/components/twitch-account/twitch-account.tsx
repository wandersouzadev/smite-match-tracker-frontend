import { useEbs } from "@/hooks/use-ebs";
import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import React from "react";
import { useRecoilValue } from "recoil";
import * as S from "./styles";

export const TwitchAccount: React.FC = () => {
  const twitchAuth = useRecoilValue(twitchAuthDataState);

  const { data, isLoading, isError } = useEbs({
    path: `/twitch/search/user?id=${twitchAuth?.channelId}`,
    token: twitchAuth?.token
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  if (isError) {
    return <h1>error</h1>;
  }

  return (
    <S.TwitchAccountWrapper>
      <S.TwitchAvatar src={data.profile_image_url} />
      <S.TwitchUsername>
        twitch.tv/
        {data.login}
      </S.TwitchUsername>
    </S.TwitchAccountWrapper>
  );
};
