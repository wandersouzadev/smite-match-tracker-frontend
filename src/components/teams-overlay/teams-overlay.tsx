import { queueIdResolver } from "@/helpers/queue-id";
import { smiteMatchState } from "@/recoil/atoms/match-state";
import { minimizedState } from "@/recoil/atoms/system";
import { blueTheme, redTheme } from "@/styles/theme";
import { XSquare } from "phosphor-react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "./styles";
import { Team } from "./team";

export const TeamsOverlay: React.FC = () => {
  const smiteTeams = useRecoilValue(smiteMatchState);
  const setMinimized = useSetRecoilState(minimizedState);

  return (
    <S.TeamsOverlayWrapper>
      <S.CloseButton onClick={() => setMinimized(true)}>
        <XSquare width={25} height={25} />
      </S.CloseButton>

      <Team
        teamTheme={redTheme}
        teamData={smiteTeams?.teams?.filter((team) => team.taskForce === 1)}
      />
      <S.MatchQueueData>
        <div>{queueIdResolver(smiteTeams?.queueId)}</div>
      </S.MatchQueueData>
      <Team
        teamTheme={blueTheme}
        teamData={smiteTeams?.teams.filter((team) => team.taskForce === 2)}
      />
    </S.TeamsOverlayWrapper>
  );
};
