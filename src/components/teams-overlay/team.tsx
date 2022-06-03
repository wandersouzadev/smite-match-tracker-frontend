import { cdnUrlHelper } from "@/helpers/hirez-cdn-url";
import { isRankedMatch } from "@/helpers/queue-id";
import { smiteMatchState, SmiteTeam } from "@/recoil/atoms/match-state";
import React from "react";
import { useRecoilValue } from "recoil";
import * as S from "./styles";

interface Props {
  teamTheme: any;
  teamData?: SmiteTeam[];
}

export const Team: React.FC<Props> = ({ teamTheme, teamData }) => {
  const matchState = useRecoilValue(smiteMatchState);

  if (!teamData) {
    return <template />;
  }

  return (
    <S.TeamTable
      colors={teamTheme}
      isRanked={isRankedMatch(matchState?.queueId)}
    >
      <S.TeamHead />
      <S.TeamBody>
        {teamData?.map((playerInfo) => (
          <tr key={playerInfo.GodName}>
            <td width="3rem">
              <S.GodThumb
                src={cdnUrlHelper(playerInfo.GodName)}
                alt={playerInfo.GodName}
              />
            </td>
            <td>
              <S.GodPlayerName isRanked={isRankedMatch(matchState?.queueId)}>
                <p>{playerInfo.GodName}</p>
                <strong
                  style={
                    playerInfo.playerId === matchState?.streamerId
                      ? { color: "gold" }
                      : {}
                  }
                >
                  {playerInfo.playerName}
                </strong>
              </S.GodPlayerName>
            </td>
            {isRankedMatch(matchState?.queueId) ? (
              <td>
                <S.MMR>
                  <p>
                    MMR: <span>{Math.round(playerInfo.Rank_Stat)}</span>
                  </p>
                </S.MMR>
              </td>
            ) : (
              <td>
                <S.Region>
                  <p>{playerInfo.playerRegion}</p>
                </S.Region>
              </td>
            )}
            {isRankedMatch(matchState?.queueId) ? (
              <td>
                <S.WinLose>
                  <p>
                    Wins: <span>{playerInfo.tierWins}</span>
                  </p>
                  <p>
                    Losses: <span>{playerInfo.tierLosses}</span>
                  </p>
                </S.WinLose>
              </td>
            ) : (
              <td />
            )}
          </tr>
        ))}
        {teamData.length < 5 ? (
          <tr style={{ backgroundColor: "black" }}>
            <td>
              <S.GodThumb
                src="https://e7.pngegg.com/pngimages/161/526/png-clipart-sign-stop-sign-stop.png"
                alt=""
              />
            </td>
            <td>
              <div style={{ fontSize: "0.8rem" }}>
                <p>disconnected</p>
              </div>
            </td>
            <td>
              <div>
                <p>unknown</p>
              </div>
            </td>
            <td>
              <div>
                <p>unknown</p>
              </div>
            </td>
          </tr>
        ) : null}
      </S.TeamBody>
    </S.TeamTable>
  );
};
