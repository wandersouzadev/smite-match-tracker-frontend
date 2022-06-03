import { MinimizedOverlay, TeamsOverlay } from "@/components/teams-overlay";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchHelper } from "@/hooks/use-twitch-helper";
import { smiteMatchState } from "@/recoil/atoms/match-state";
import { minimizedState } from "@/recoil/atoms/system";
import { twitchAuthDataState } from "@/recoil/atoms/twitch-auth-data";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "./styles";

export const OverlayTemplate: React.FC = () => {
  useTwitchHelper();
  const twitchAuthData = useRecoilValue(twitchAuthDataState);
  const setSmiteTeam = useSetRecoilState(smiteMatchState);
  const minimized = useRecoilValue(minimizedState);

  const { data, isLoading, isError } = useEbs({
    path: "/smite/live-match",
    token: twitchAuthData?.token,
    config: {
      revalidateOnFocus: true
    }
  });
  useEffect(() => {
    if (data && data.status === "In Game") {
      setSmiteTeam({
        queueId: data.queueId,
        streamerId: data.accountId,
        teams: data.teamsData
      });
    }
  }, [data, setSmiteTeam]);

  if (isLoading) {
    return <template />;
  }

  if (isError) {
    return <template />;
  }

  if (data?.status !== "In Game") {
    return <template />;
  }

  return (
    <S.OverlayWrapper>
      {minimized ? <MinimizedOverlay /> : <TeamsOverlay />}
    </S.OverlayWrapper>
  );
};
