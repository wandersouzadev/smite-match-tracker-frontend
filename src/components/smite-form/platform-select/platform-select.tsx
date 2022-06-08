import { PlatformIcon } from "@/components/platform-icon";
import { smiteFormDataState } from "@/recoil/atoms/smite-form-data";
import React from "react";
import { useSetRecoilState } from "recoil";
import Styles from "./styles.module.scss";

export const SmiteFormPlatformSelect: React.FC = () => {
  const setSmiteFormInput = useSetRecoilState(smiteFormDataState);
  const handlePlatformSelect = (platformId?: string) => {
    setSmiteFormInput({ platform: platformId, step: 1 });
  };
  return (
    <div className={Styles["platform-select"]}>
      <p className={Styles.label}>Select your platform</p>

      <div className={Styles.platforms}>
        <button type="button" onClick={() => handlePlatformSelect()}>
          <PlatformIcon platformName="PC" />
        </button>
        <button type="button" onClick={() => handlePlatformSelect("22")}>
          <PlatformIcon platformName="Nintendo Switch" />
        </button>
        <button type="button" onClick={() => handlePlatformSelect("9")}>
          <PlatformIcon platformName="PSN" />
        </button>
        <button type="button" onClick={() => handlePlatformSelect("10")}>
          <PlatformIcon platformName="XboxLive" />
        </button>
      </div>
    </div>
  );
};
