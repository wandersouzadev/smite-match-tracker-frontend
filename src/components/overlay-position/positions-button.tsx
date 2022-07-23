import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { appConfigState } from "@/recoil/atoms/app-config";
import axios from "axios";
import cx from "classnames";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Styles from "./styles.module.scss";

interface Props {
  position:
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

export const PositionsButton: React.FC<Props> = ({ position }) => {
  const twitchAuth = useTwitchAuth();
  const [appConfig, setAppConfig] = useRecoilState(appConfigState);
  const { data } = useEbs<{ position: any | null }>({
    path: "/twitch/configuration/settings",
    token: twitchAuth?.token
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setAppConfig((oldValue) => {
      return {
        ...oldValue,
        position: data.position
      };
    });
  }, [data, setAppConfig]);

  const handleClick = (overlayPosition: string) => {
    axios({
      url: `${process.env.API_URL}/twitch/configuration/settings`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${twitchAuth?.token}`
      },
      data: {
        position: overlayPosition
      }
    }).then((resp) => {
      setAppConfig((oldValue) => {
        return {
          ...oldValue,
          position: resp?.data?.position
        };
      });
    });
  };
  return (
    <button
      className={cx(
        appConfig?.position === position && Styles.active,
        !appConfig?.position && position === "left" && Styles.active
      )}
      type="button"
      onClick={() => handleClick(position)}
    >
      {position}
    </button>
  );
};
