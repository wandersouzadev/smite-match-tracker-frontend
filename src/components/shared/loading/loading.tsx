import React from "react";
import { SpinnerCircular } from "spinners-react";
import Styles from "./loading.module.scss";

interface Props {
  hexColor?: string;
}

export const Loading: React.FC<Props> = ({ hexColor = "#9f9160" }) => {
  return (
    <div className={Styles.wrapper}>
      <SpinnerCircular color={hexColor} />
    </div>
  );
};
