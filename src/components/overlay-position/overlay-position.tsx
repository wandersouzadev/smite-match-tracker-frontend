import { useEbs } from "@/hooks/use-ebs";
import { useTwitchAuth } from "@/hooks/use-twitch-auth";
import { appConfigState } from "@/recoil/atoms/app-config";
import axios from "axios";
import cx from "classnames";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Styles from "./overlay-position.module.scss";

export const OverlayPosition: React.FC = () => {
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
    <div className={Styles.wrapper}>
      <button
        className={cx(appConfig?.position === "top-left" && Styles.active)}
        type="button"
        onClick={() => handleClick("top-left")}
      >
        top-left
      </button>

      <button
        className={cx(appConfig?.position === "top-right" && Styles.active)}
        type="button"
        onClick={() => handleClick("top-right")}
      >
        top-right
      </button>

      <button
        className={cx(appConfig?.position === "left" && Styles.active)}
        type="button"
        onClick={() => handleClick("left")}
      >
        left
      </button>

      <button
        className={cx(appConfig?.position === "right" && Styles.active)}
        type="button"
        onClick={() => handleClick("right")}
      >
        right
      </button>

      <button
        className={cx(appConfig?.position === "bottom-left" && Styles.active)}
        type="button"
        onClick={() => handleClick("bottom-left")}
      >
        bottom-left
      </button>

      <button
        className={cx(appConfig?.position === "bottom-right" && Styles.active)}
        type="button"
        onClick={() => handleClick("bottom-right")}
      >
        bottom-right
      </button>
    </div>
  );
};
