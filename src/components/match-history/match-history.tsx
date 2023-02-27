import { cdnGodIconHelper } from "@/helpers/cdn-god-icon";
import { cdnItemsImgHelper } from "@/helpers/items-image";
import { smiteQueueHelper } from "@/helpers/queue";
import { SmiteRegionFlagsHelper } from "@/helpers/region-flags";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { GetMatchHistory } from "@/typings/smite/get-matches";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";
import { Error } from "../shared/error";
import { Loading } from "../shared/loading";
import Styles from "./match-history.module.scss";

dayjs.extend(utc);
dayjs.extend(tz);
const timeZone = dayjs.tz.guess();

export const MatchHistory: React.FC = () => {
  const twitchAuth = useTwitchAuth();
  const { data, isLoading, isError } = useEbs<GetMatchHistory[]>({
    path: "/smite/player-history/@me",
    token: twitchAuth?.token,
    config: {
      revalidateOnFocus: true,
      refreshInterval: 30000 // 30secs
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  if (data[0]?.ret_msg?.includes("No Match History")) {
    return <Error message="No recent matches found" />;
  }

  return (
    <div className={Styles.wrapper}>
      <table>
        <tbody>
          {data?.map((playerH) => (
            <tr
              className={
                playerH.Win_Status === "Win" ? Styles.win : Styles.lose
              }
              key={playerH.Match}
            >
              <td className={Styles.small}>
                {dayjs
                  .utc(`${playerH.Match_Time} UTC`)
                  .tz(timeZone)
                  .format("DD/MMM")}
              </td>

              <td title={`${playerH.Region} Server`}>
                <img
                  className={Styles.icon}
                  src={SmiteRegionFlagsHelper(playerH.Region)}
                  alt=""
                />
              </td>

              <td className={Styles.small} title="Game Mode" align="center">
                <p>{smiteQueueHelper(playerH.Match_Queue_Id)}</p>
              </td>

              <td title={playerH.God}>
                <img
                  className={Styles.icon}
                  src={cdnGodIconHelper(playerH.God, {
                    replaceUnderscore: true
                  })}
                  alt=""
                />
              </td>

              <td title="K/D/A" align="center">
                {playerH.Kills}/{playerH.Deaths}/{playerH.Assists}
              </td>

              <td title={playerH.Active_1}>
                <img
                  className={Styles.icon}
                  src={cdnItemsImgHelper(playerH.Active_1)}
                  alt=""
                />
              </td>
              <td title={playerH.Active_2}>
                <img
                  className={Styles.icon}
                  src={cdnItemsImgHelper(playerH.Active_2)}
                  alt=""
                />
              </td>

              {playerH.Item_1 && (
                <td title={playerH.Item_1}>
                  <img
                    className={Styles.icon}
                    src={cdnItemsImgHelper(playerH.Item_1)}
                    alt=""
                  />
                </td>
              )}
              {playerH.Item_2 && (
                <td title={playerH.Item_2}>
                  <img
                    className={Styles.icon}
                    src={cdnItemsImgHelper(playerH.Item_2)}
                    alt=""
                  />
                </td>
              )}
              {playerH.Item_3 && (
                <td title={playerH.Item_3}>
                  <img
                    className={Styles.icon}
                    src={cdnItemsImgHelper(playerH.Item_3)}
                    alt=""
                  />
                </td>
              )}
              {playerH.Item_4 && (
                <td title={playerH.Item_4}>
                  <img
                    className={Styles.icon}
                    src={cdnItemsImgHelper(playerH.Item_4)}
                    alt=""
                  />
                </td>
              )}
              {playerH.Item_5 && (
                <td title={playerH.Item_5}>
                  <img
                    className={Styles.icon}
                    src={cdnItemsImgHelper(playerH.Item_5)}
                    alt=""
                  />
                </td>
              )}
              {playerH.Item_6 && (
                <td title={playerH.Item_6}>
                  <img
                    className={Styles.icon}
                    src={cdnItemsImgHelper(playerH.Item_6)}
                    alt=""
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
