import { smiteFormDataState } from "@/recoil/atoms/smite-form-data";
import { ArrowClockwise } from "phosphor-react";
import React from "react";
import { useResetRecoilState } from "recoil";
import Styles from "./styles.module.scss";

export const SmiteFormError: React.FC = () => {
  const setSmiteForm = useResetRecoilState(smiteFormDataState);

  return (
    <div className={Styles.wrapper}>
      <strong>Error, profile not found</strong>
      <strong>
        Confirm that your <u>SMITE</u> profile is not blocked for viewing
      </strong>
      <button type="button">
        <ArrowClockwise
          size={32}
          cursor="pointer"
          onClick={() => setSmiteForm()}
        />
      </button>
    </div>
  );
};
