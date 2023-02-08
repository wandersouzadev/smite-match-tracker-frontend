import { cdnGodsImgLoad } from "@/helpers/gods-img";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { GetGods } from "@/typings/smite/get-gods";
import React from "react";
import { SpinnerDiamond } from "spinners-react";
import { Error } from "../shared/error";
import { Loading } from "../shared/loading";
import Styles from "./stats.modules.scss";

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
    return (
      <Loading>
        <SpinnerDiamond color="#9f9160" />
      </Loading>
    );
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className={Styles.wrapper}>
      <table className={Styles.table}>
        <tbody>
          <tr>
            {data?.slice(0, 5).map((playerGodsData) => (
              <td key={playerGodsData.god_id}>
                <img
                  src={cdnGodsImgLoad(playerGodsData.god)}
                  alt={playerGodsData.god}
                  height={290}
                  width={112}
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
