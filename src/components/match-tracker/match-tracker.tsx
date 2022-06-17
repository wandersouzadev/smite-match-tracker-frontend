import { SmiteGameModeList, smiteQueueHelper } from "@/helpers/queue";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { SmiteLiveMatch } from "@/typings/smite/live-match";
import React from "react";
import { SpinnerDiamond } from "spinners-react";
import { Error } from "../common/error";
import { Loading } from "../common/loading";
import Styles from "./styles.module.scss";
import { Team } from "./team";

export const MatchTracker: React.FC = () => {
  const twitchAuth = useTwitchAuth();

  const { data, isLoading, isError } = useEbs<SmiteLiveMatch>({
    path: "/smite/live-match",
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

  const orderPlayers = data?.teamsData?.filter(
    (player) => player.taskForce === 2
  );
  const chaosPlayers = data?.teamsData?.filter(
    (player) => player.taskForce === 1
  );

  if (data.status !== "In Game") {
    return (
      <div className={Styles["waiting-match"]}>
        Waiting to join a match
        <SpinnerDiamond size={28} color="#ada176" />
      </div>
    );
  }

  if (!SmiteGameModeList.includes(Number(data.queueId))) {
    return (
      <div className={Styles["waiting-match"]}>
        Waiting to join a match
        <SpinnerDiamond size={28} color="#ada176" />
      </div>
    );
  }

  return (
    <div className={Styles["match-tracker"]}>
      <h3>{smiteQueueHelper(data.queueId)}</h3>
      <div className={Styles.match}>
        <div className={Styles.order}>
          <Team
            players={orderPlayers}
            streamerAccountId={data.accountId}
            gameModId={Number(data.queueId)}
          />
        </div>
        <div className={Styles.chaos}>
          <Team
            players={chaosPlayers}
            streamerAccountId={data.accountId}
            gameModId={Number(data.queueId)}
          />
        </div>
      </div>
    </div>
  );
};
