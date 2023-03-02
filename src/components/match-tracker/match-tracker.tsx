import { Error } from "@/components/shared/error";
import { Loading } from "@/components/shared/loading";
import { Team } from "@/components/team";
import { SmiteGameMode } from "@/helpers/game-mode";
import { SmiteGameModeList, smiteQueueHelper } from "@/helpers/queue";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { SmiteLiveMatch } from "@/typings/smite/live-match";
import React from "react";
import { SpinnerDiamond } from "spinners-react";
import Styles from "./match-tracker.module.scss";

export const MatchTracker: React.FC = () => {
  const twitchAuth = useTwitchAuth();

  const { data, isLoading, isError } = useEbs<SmiteLiveMatch>({
    path: "/smite/live-match",
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

  const orderPlayers = data?.teamsData?.filter(
    (player) => player.taskForce === 2
  );
  const chaosPlayers = data?.teamsData?.filter(
    (player) => player.taskForce === 1
  );

  if (data?.status === "Unknown") {
    return <Error message={`${data.accountName} has hidden SMITE profile`} />;
  }

  if (data?.status === "Offline") {
    return (
      <div className={Styles["waiting-match"]}>
        <p>
          SMITE account{" "}
          <strong className={Styles["streamer-name"]}>
            {data.accountName}
          </strong>{" "}
          is offline
        </p>
      </div>
    );
  }

  if (data?.status === "In Lobby") {
    return (
      <div className={Styles["waiting-match"]}>
        <p>
          <strong className={Styles["streamer-name"]}>
            {data.accountName}
          </strong>{" "}
          is on the lobby
        </p>
        <SpinnerDiamond size={28} color="#ada176" />
      </div>
    );
  }

  if (data?.status === "God Selection") {
    return (
      <div className={Styles["waiting-match"]}>
        <p>
          <strong className={Styles["streamer-name"]}>
            {data.accountName}
          </strong>{" "}
          is on the god selection
        </p>
        <SpinnerDiamond size={28} color="#ada176" />
      </div>
    );
  }

  if (!SmiteGameModeList.includes(Number(data?.queueId))) {
    return (
      <div className={Styles["waiting-match"]}>
        <SpinnerDiamond size={68} color="#ada176" />
      </div>
    );
  }

  if (
    data?.status === "In Game" &&
    Number(data.queueId) === SmiteGameMode.JunglePractice
  ) {
    return (
      <div className={Styles["waiting-match"]}>
        <p>
          <strong className={Styles["streamer-name"]}>
            {data.accountName}
          </strong>{" "}
          is on the Jungle Practice
        </p>
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
