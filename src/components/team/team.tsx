import { cdnGodIconHelper } from "@/helpers/cdn-god-icon";
import { isRankedHelper } from "@/helpers/is-ranked";
import { mmrAverageHelper } from "@/helpers/mmr-average";
import { mmrToTierHelper } from "@/helpers/mmr-to-tier";
import { playersCountByGameModeHelper } from "@/helpers/queue";
import { tierNameByIdHelper } from "@/helpers/smite-tier";
import { SmiteMatchPlayer } from "@/typings/smite/match-player";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { SpinnerRoundFilled } from "spinners-react";
import Styles from "./team.module.scss";

interface Props {
  players: SmiteMatchPlayer[];
  streamerAccountId: string;
  gameModeId: number;
}

export const Team: React.FC<Props> = ({
  players,
  streamerAccountId,
  gameModeId: gameModId
}) => {
  const [teamMatchState, setTeamMatchState] = useState({
    hasDisconnectedPlayers: false,
    disconnectedPlayersCount: 0
  });

  useEffect(() => {
    const count = playersCountByGameModeHelper(gameModId);
    const diff = count - players.length;
    const disconnectedPlayersCount = diff <= 0 ? 0 : diff;
    setTeamMatchState({
      hasDisconnectedPlayers: !!disconnectedPlayersCount,
      disconnectedPlayersCount
    });
  }, [setTeamMatchState, gameModId, players.length]);

  const averageMMR = mmrAverageHelper(players);

  return (
    <table className={Styles["team-table"]}>
      <tbody>
        {players.map((player) => (
          <tr key={player.GodName}>
            <td
              title={player.GodName}
              className={Styles["god-img"]}
              style={{ width: "55px" }}
            >
              <img src={cdnGodIconHelper(player.GodName)} alt="" />
            </td>
            <td align="center" style={{ minWidth: "118px", maxWidth: "122px" }}>
              <strong
                className={classNames(
                  streamerAccountId === player.playerId &&
                    Styles["streamer-name"]
                )}
              >
                {player.playerName || "-"}
              </strong>
            </td>
            <td align="center" title="MMR">
              {player.Rank_Stat && player.Rank_Stat !== 1500 ? (
                <>
                  <p>
                    <small>{Math.round(player.Rank_Stat)}</small>
                  </p>
                  <p>
                    <strong>{tierNameByIdHelper(player.Tier)}</strong>
                  </p>
                </>
              ) : (
                <p>
                  <strong>Unranked</strong>
                </p>
              )}
            </td>
            <td align="center" title="Wins/Losses">
              {player.Rank_Stat &&
              (player.tierWins >= 1 || player.tierLosses >= 1) ? (
                <>
                  <p>
                    <strong>Wins:</strong> {player.tierWins}
                  </p>
                  <p>
                    <strong>Losses:</strong> {player.tierLosses}
                  </p>
                </>
              ) : (
                <> </>
              )}
            </td>
          </tr>
        ))}
        {isRankedHelper(gameModId) && (
          <tr>
            <td
              align="center"
              colSpan={4}
              title="Average MMR"
              className={Styles["content-mmr"]}
            >
              <strong>
                Average MMR {averageMMR} {mmrToTierHelper(averageMMR)}
              </strong>
            </td>
          </tr>
        )}
        {teamMatchState.hasDisconnectedPlayers
          ? Array.from(
              Array(teamMatchState.disconnectedPlayersCount).keys()
            ).map(() => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td className={Styles["content-img"]}>
                    <SpinnerRoundFilled color="#ada176" />
                  </td>

                  <td className={Styles["content-name"]}>waiting connect</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};
