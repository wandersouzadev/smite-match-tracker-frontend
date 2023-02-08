import { cdnGodsImgLoad } from "@/helpers/gods-img";
import { playersCountByGameMode } from "@/helpers/queue";
import { tierNameById } from "@/helpers/smite-tier";
import { SmiteMatchPlayer } from "@/typings/smite/match-player";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { SpinnerRoundFilled } from "spinners-react";
import Styles from "./team.modules.scss";

interface Props {
  players: SmiteMatchPlayer[];
  streamerAccountId: string;
  gameModId: number;
}

export const Team: React.FC<Props> = ({
  players,
  streamerAccountId,
  gameModId
}) => {
  const [teamMatchState, setTeamMatchState] = useState({
    hasDisconnectedPlayers: false,
    disconnectedPlayersCount: 0
  });

  useEffect(() => {
    const count = playersCountByGameMode(gameModId);
    const diff = count - players.length;
    const disconnectedPlayersCount = diff <= 0 ? 0 : diff;
    setTeamMatchState({
      hasDisconnectedPlayers: !!disconnectedPlayersCount,
      disconnectedPlayersCount
    });
  }, [setTeamMatchState, gameModId, players.length]);

  return (
    <table className={Styles["team-table"]}>
      <tbody>
        {players.map((player) => (
          <tr key={player.GodName}>
            <td title={player.GodName} className={Styles["content-img"]}>
              <img src={cdnGodsImgLoad(player.GodName)} alt={player.GodName} />
            </td>
            <td title="Player name" className={Styles["content-name"]}>
              <strong
                className={classNames(
                  streamerAccountId === player.playerId
                    ? Styles["streamer-player"]
                    : {},
                  player.playerName.length > 13 && Styles.small,
                  Styles["player-name"]
                )}
              >
                {player.playerName || "-"}
              </strong>
            </td>
            <td title="MMR" className={Styles["content-mmr"]}>
              {player.Rank_Stat && player.Rank_Stat !== 1500 ? (
                <>
                  <p>
                    <small>{Math.round(player.Rank_Stat)}</small>
                  </p>
                  <p>
                    <strong>{tierNameById(player.Tier)}</strong>
                  </p>
                </>
              ) : (
                <p>
                  <strong>Unranked</strong>
                </p>
              )}
            </td>
            <td title="Wins/Losses" className={Styles["content-winlose"]}>
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
