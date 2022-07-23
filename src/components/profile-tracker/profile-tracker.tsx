import { ReactComponent as ControllerIcon } from "@/assets/controller-icon.svg";
import { ReactComponent as MouseIcon } from "@/assets/mouse-icon.svg";
import { mmrFix } from "@/helpers/mmr-fix";
import { loadProfileAvatar } from "@/helpers/profile-avatar";
import { tierNameById } from "@/helpers/smite-tier";
import { loadImgByTier } from "@/helpers/tier-img";
import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { GetPlayer } from "@/typings/smite/get-player";
import cx from "classnames";
import React, { useRef, useState } from "react";
import { Error } from "../common/error";
import { Loading } from "../common/loading";
import Styles from "./styles.module.scss";

type InputType = "keyboard" | "controller";

export const ProfileTracker: React.FC = () => {
  const [profileInput, setProfileInput] = useState<InputType>("keyboard");
  const imgRef = useRef<HTMLImageElement>(null);
  const handleToggleInput = (input: InputType) => {
    setProfileInput(input);
  };

  const twitchAuth = useTwitchAuth();
  const { data, isLoading, isError } = useEbs<GetPlayer>({
    path: "/smite/player/@me",
    token: twitchAuth?.token,
    config: {
      revalidateOnFocus: true
    }
  });

  const handleImgError = () => {
    if (imgRef.current?.src) {
      imgRef.current.src = "Icons/Random.webp";
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.profile}>
        <div className={Styles["input-select"]}>
          <button
            className={profileInput === "keyboard" ? Styles.active : null}
            type="button"
            onClick={() => handleToggleInput("keyboard")}
          >
            <MouseIcon />
          </button>
          <button
            className={profileInput === "controller" ? Styles.active : null}
            type="button"
            onClick={() => handleToggleInput("controller")}
          >
            <ControllerIcon />
          </button>
        </div>
        <div className={Styles["profile-image"]}>
          <img
            src={loadProfileAvatar(data.Avatar_URL) || "Icons/Random.webp"}
            ref={imgRef}
            onError={handleImgError}
            alt="icon"
          />
        </div>
        <div className={Styles["profile-data"]}>
          <div className={Styles.data}>
            <strong>{data.hz_player_name || data.hz_gamer_tag}</strong>
          </div>
          {data.Team_Name && (
            <div className={Styles.data}>
              <strong style={{ fontSize: "0.8rem" }}>{data.Team_Name}</strong>
            </div>
          )}
          <div className={Styles.data}>
            <img src="Icons/Player_Level.webp" alt="Player level icon" />
            {data.Level}
          </div>
          <div className={Styles.data}>
            <img src="Icons/Mastery_Level.webp" alt="Mastery level icon" />
            {data.MasteryLevel}
          </div>
        </div>
      </div>
      <div className={Styles.league}>
        <div
          className={cx(
            Styles["league-content"],
            Styles["league-content-conquest"]
          )}
        >
          <p>Conquest</p>
          <img
            src={loadImgByTier(
              profileInput === "keyboard"
                ? Math.round(data.RankedConquest.Tier)
                : Math.round(data.RankedConquestController.Tier),
              "Conquest"
            )}
            alt="Conquest League"
          />
          <p>
            {tierNameById(
              profileInput === "keyboard"
                ? Math.round(data.RankedConquest.Tier)
                : Math.round(data.RankedConquestController.Tier)
            )}
          </p>
          <p>
            {profileInput === "keyboard"
              ? Math.round(mmrFix(data.RankedConquest.Rank_Stat))
              : Math.round(mmrFix(data.RankedConquestController.Rank_Stat))}
          </p>
        </div>
        <div
          className={cx(
            Styles["league-content"],
            Styles["league-content-joust"]
          )}
        >
          <p>Joust</p>
          <img
            src={loadImgByTier(
              profileInput === "keyboard"
                ? Math.round(data.RankedJoust.Tier)
                : Math.round(data.RankedJoustController.Tier),
              "Joust"
            )}
            alt="Joust League"
          />
          <p>
            {tierNameById(
              profileInput === "keyboard"
                ? Math.round(data.RankedJoust.Tier)
                : Math.round(data.RankedJoustController.Tier)
            )}
          </p>
          <p>
            {profileInput === "keyboard"
              ? Math.round(mmrFix(data.RankedJoust.Rank_Stat))
              : Math.round(mmrFix(data.RankedJoustController.Rank_Stat))}
          </p>
        </div>
        <div
          className={cx(
            Styles["league-content"],
            Styles["league-content-duel"]
          )}
        >
          <p>Duel</p>
          <img
            src={loadImgByTier(
              profileInput === "keyboard"
                ? data.RankedDuel.Tier
                : data.RankedDuelController.Tier,
              "Duel"
            )}
            alt="Duel League"
          />
          <p>
            {tierNameById(
              profileInput === "keyboard"
                ? data.RankedDuel.Tier
                : data.RankedDuelController.Tier
            )}
          </p>
          <p>
            {Math.round(
              profileInput === "keyboard"
                ? mmrFix(data.RankedDuel.Rank_Stat)
                : mmrFix(data.RankedDuelController.Rank_Stat)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
