import { PlatformIcon } from "@/components/shared/platform-icon";
import { smiteFormState } from "@/recoil/atoms/smite-form";
import React from "react";
import { useSetRecoilState } from "recoil";
import Styles from "./styles.module.scss";

export const SmiteFormPlatformSelect: React.FC = () => {
  const setSmiteForm = useSetRecoilState(smiteFormState);
  const handlePlatformSelect = (platformId?: string) => {
    setSmiteForm({ platform: platformId, step: 1 });
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
