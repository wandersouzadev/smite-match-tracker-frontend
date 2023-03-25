import { smiteFormState } from "@/recoil/atoms/smite-form";
import { ArrowClockwise } from "phosphor-react";
import React from "react";
import { useResetRecoilState } from "recoil";
import Styles from "./form-error.module.scss";

export const SmiteFormError: React.FC = () => {
  const resetSmiteForm = useResetRecoilState(smiteFormState);

  return (
    <div className={Styles.wrapper}>
      <strong>SMITE profile not found</strong>
      <strong>
        Confirm that your <u>SMITE</u> profile is not hidden.
      </strong>
      <button type="button">
        <ArrowClockwise
          size={32}
          cursor="pointer"
          onClick={() => resetSmiteForm()}
        />
      </button>
    </div>
  );
};
