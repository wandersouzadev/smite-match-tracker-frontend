import { cdnGodImgHelper } from "@/helpers/gods-img";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { GetGods } from "@/typings/smite/get-gods";
import React from "react";
import { Error } from "../shared/error";
import { Loading } from "../shared/loading";
import Styles from "./stats.module.scss";

export const Stats: React.FC = () => {
  const twitchAuth = useTwitchAuth();
  const { data, isLoading, isError } = useEbs<GetGods[]>({
    path: "/smite/player-gods-ranks/@me",
    token: twitchAuth?.token,
    config: {
      revalidateOnFocus: true
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  if (!data?.length) {
    return (
      <div className={Styles.center}>
        <Error message="Streamer has hidden SMITE profile" />
      </div>
    );
  }

  return (
    <div className={Styles.wrapper}>
      <table className={Styles.table}>
        <tbody>
          <tr>
            {data?.slice(0, 5).map((playerGodsData) => (
              <td key={playerGodsData.god_id}>
                <img
                  src={cdnGodImgHelper(playerGodsData.god)}
                  alt={playerGodsData.god}
                  height={314}
                  width={114}
                />

                <div className={Styles.top}>
                  <h3>{playerGodsData.god}</h3>
                </div>
                <div className={Styles.bottom}>
                  <h4>Wins: {playerGodsData.Wins}</h4>
                  <h4>Kills: {playerGodsData.Kills}</h4>
                  <h4>Assists: {playerGodsData.Assists}</h4>
                  <h4>Worshippers: {playerGodsData.Worshippers}</h4>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
