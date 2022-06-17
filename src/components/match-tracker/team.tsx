import { cdnGodsImgLoad } from "@/helpers/gods-img";
import { playersCountByGameMode } from "@/helpers/queue";
import { tierNameById } from "@/helpers/smite-tier";
import { SmiteMatchPlayer } from "@/typings/smite/match-player";
import React, { useEffect, useState } from "react";
import { SpinnerRoundFilled } from "spinners-react";
import Styles from "./styles.module.scss";

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
            <td title="God image" className={Styles["content-img"]}>
              <img src={cdnGodsImgLoad(player.GodName)} alt={player.GodName} />
            </td>
            <td title="Player name" className={Styles["content-name"]}>
              <p>
                <small>{player.GodName}</small>
              </p>
              <p>
                <strong
                  className={
                    streamerAccountId === player.playerId
                      ? Styles["streamer-player"]
                      : {}
                  }
                >
                  {player.playerName}
                </strong>
              </p>
            </td>
            <td title="MMR" className={Styles["content-mmr"]}>
              {!!player.Rank_Stat && (
                <>
                  <p>
                    <small>{Math.round(player.Rank_Stat)}</small>
                  </p>
                  <p>
                    <strong>{tierNameById(player.Tier)}</strong>
                  </p>
                </>
              )}
            </td>
            <td title="Wins/Losses" className={Styles["content-winlose"]}>
              {!!player.Rank_Stat && (
                <>
                  <p>
                    <strong>Wins:</strong> {player.tierWins}
                  </p>
                  <p>
                    <strong>Losses:</strong> {player.tierLosses}
                  </p>
                </>
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
                  <td title="God image" className={Styles["content-img"]}>
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
